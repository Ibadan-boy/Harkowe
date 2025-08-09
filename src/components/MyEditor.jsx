import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useCallback, useRef, useState } from 'react';
import AllMenu from './Menu/AllMenu';
import WordCount from './WordCount';
import AiWhisperBox from './AiWhisperBox';
import { useWhisperAI } from './hooks/useWhisperAi';
import { debounce } from 'lodash';

const extensions = [
  StarterKit,
  Image.configure({
    inline: true,
    allowBase64: true,
    HTMLAttributes: {
      class: 'max-w-full h-auto rounded-md shadow',
      style: 'max-width: 400px;',
    },
  }),
  Link.configure({
    autolink: true,
    openOnClick: false,
    HTMLAttributes: {
      target: '_blank',
      rel: 'noopener noreferrer',
      class: 'text-blue-600 underline cursor-pointer hover:text-blue-800',
    },
  }),
];

const MyEditor = ({ title }) => {
  const editor = useEditor({
    extensions,
    content: '',
  });

  const [showWordCount, setShowWordCount] = useState(false);
  const [removeBorder, setRemoveBorder] = useState(false);

  const [aiEnabled] = useState(true);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const editorRef = useRef(null);
  const typingTimeout = useRef(null);

  const { suggestion, visible, triggerSuggestion, insertSuggestion } = useWhisperAI(editor, aiEnabled);

  // Load editor content and border state from localStorage
  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (editor && savedContent) {
      editor.commands.setContent(savedContent);
    }

    const savedBorderState = localStorage.getItem('removeBorder');
    if (savedBorderState !== null) {
      setRemoveBorder(savedBorderState === 'true');
    }
  }, [editor]);

  // Save contents to Firestore
  const saveToFirestore = useCallback(
    debounce(
      async (content) => {
        try {
          const docRef = doc(db, 'documents', 'myDoc-ID');
          await setDoc(docRef, {
            title: title || 'Untitled',
            content,
            updatedAt: new Date(),
          });
        } catch (error) {
          console.error('Error saving to Firestore', error);
        }
      },
      1000
    ),
    [title]
  );

  useEffect(() => {
    if (!editor) return;
    const saveContent = () => {
      const html = editor.getHTML();
      localStorage.setItem('editorContent', html);
      saveToFirestore(html);
    };
    editor.on('update', saveContent);
    return () => editor.off('update', saveContent);
  }, [editor, saveToFirestore]);

  // Trigger AI suggestion after typing stops
  useEffect(() => {
    if (!editor) return;

    const handleTyping = () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);

      typingTimeout.current = setTimeout(() => {
        const { from } = editor.state.selection;
        const coords = editor.view.coordsAtPos(from);
        setPosition({ top: coords.top + 24, left: coords.left });
        if (triggerSuggestion) triggerSuggestion();
      }, 5000);
    };

    editor.on('update', handleTyping);
    return () => editor.off('update', handleTyping);
  }, [editor, triggerSuggestion]);

  // Listen for Tab key to insert suggestion
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Tab' && visible && suggestion) {
        event.preventDefault();
        insertSuggestion();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, suggestion, insertSuggestion]);

  const toggleWordCount = () => setShowWordCount((prev) => !prev);
  const toggleRemoveBorder = () => {
    setRemoveBorder((prev) => {
      const newState = !prev;
      localStorage.setItem('removeBorder', newState);
      return newState;
    });
  };

  if (!editor) return null;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .tiptap-no-outline .ProseMirror {
              outline: none;
              border: none;
              margin: 1.5rem;
              font-family: 'Atkinson Hyperlegible', sans-serif;
              font-size: 1.1rem;
              line-height: 1.75;
              color: #374151;
            }
          `,
        }}
      />
      <div className="min-h-screen transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-5xl mx-auto relative">
            <div
              className={`p-8 prose prose-lg focus:outline-none max-w-none transition-all duration-200 relative
              ${removeBorder ? '' : 'border border-gray-300 shadow'}
              dark:prose-invert`}
              ref={editorRef}
            >
              <EditorContent
                editor={editor}
                className="tiptap-no-outline [&_.ProseMirror]:min-h-[800px]"
              />
              <AiWhisperBox
                suggestion={suggestion}
                visible={visible}
                position={position}
              />
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block fixed left-8 top-[20%] transform -translate-y-1/2 z-40">
          <AllMenu
            editor={editor}
            onWordCount={toggleWordCount}
            onRemoveBorder={toggleRemoveBorder}
          />
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex flex-col-reverse items-center">
            <AllMenu
              editor={editor}
              onWordCount={toggleWordCount}
              onRemoveBorder={toggleRemoveBorder}
            />
          </div>
        </div>
      </div>

      {showWordCount && (
        <div className="fixed bottom-4 left-8 z-50 bg-gray-300 wordCount1 backdrop-blur px-3 py-1 rounded-md shadow text-sm text-gray-600">
          <WordCount editor={editor} />
        </div>
      )}
    </>
  );
};

export default MyEditor;
