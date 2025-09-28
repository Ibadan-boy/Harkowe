import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { db } from '../services/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useEffect, useCallback, useRef, useState } from 'react';
import AllMenu from './Menu/AllMenu';
import WordCount from './WordCount';
import { useWhisperAI } from './hooks/useWhisperAi';
import { debounce } from 'lodash';
import { AISuggestion } from './SuggestionGhost';

const extensions = [
  StarterKit,
  AISuggestion,
  Image.configure({
    inline: true,
    allowBase64: true,
    HTMLAttributes: {
      class: 'max-w-full h-auto rounded-md shadow',
      style: 'max-width: 100%; width: 100%;',
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

const MyEditor = ({ title, docID }) => {
  const [showWordCount, setShowWordCount] = useState(false);
  const [removeBorder, setRemoveBorder] = useState(false);
  const [aiEnabled] = useState(true);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const editorRef = useRef(null);
  const typingTimeout = useRef(null);

  const localStorageKey = `draft-${docID}`;

  const saveToFirestore = useCallback(
    debounce(async (content) => {
      if (!docID) return;
      try {
        const docRef = doc(db, 'documents', docID);
        await setDoc(
          docRef,
          {
            title: title || 'Untitled',
            content,
            updatedAt: new Date(),
            docID,
          },
          { merge: true }
        );
      } catch (error) {
        console.error('Error saving to Firestore', error);
      }
    }, 1000),
    [title, docID]
  );

  const editor = useEditor({
    extensions,
    content: '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      localStorage.setItem(localStorageKey, html);
      saveToFirestore(html);
    },
  });

  const { suggestion, visible, triggerSuggestion, insertSuggestion } =
    useWhisperAI(editor, aiEnabled);

    useEffect(() => {
  if (!editor) return
  editor.extensionManager.extensions.find(e => e.name === 'aiSuggestion')
    .options.suggestion = suggestion || null
  editor.view.dispatch(editor.view.state.tr) // force re-render
}, [suggestion, editor])


  useEffect(() => {
    if (!editor) return;

    const localDraft = localStorage.getItem(localStorageKey);
    if (localDraft) {
      editor.commands.setContent(localDraft);
    }

    async function loadFromFirestore() {
      if (!docID) return;
      try {
        const snap = await getDoc(doc(db, 'documents', docID));
        if (snap.exists()) {
          const data = snap.data();
          editor.commands.setContent(data.content || '');
        }
      } catch (error) {
        console.error('Error loading from Firestore', error);
      }
    }
    loadFromFirestore();
  }, [docID, editor]);

  useEffect(() => {
    if (!editor) return;

    const handleTyping = () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);

      typingTimeout.current = setTimeout(() => {
        const { from } = editor.state.selection;
        const coords = editor.view.coordsAtPos(from);
        const editorRect = editorRef.current?.getBoundingClientRect();
        setPosition({
          top: coords.top - editorRect.top + 20, // Relative to editor
          left: Math.min(coords.left - editorRect.left, editorRect.width - 100), // Prevent overflow
        });
        if (triggerSuggestion) triggerSuggestion();
      }, 5000);
    };

    editor.on('update', handleTyping);
    return () => editor.off('update', handleTyping);
  }, [editor, triggerSuggestion]);

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

  const requestSuggestion = async () => {
    console.log('Requesting AI suggestion...');
     if (!suggestion) return; // wait until hook sets it
      insertSuggestion(); // this already calls editor.commands.insertContent
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .tiptap-no-outline .ProseMirror {
              outline: none;
              border: none;
              margin: 1rem 0.5rem;
              font-family: 'Atkinson Hyperlegible', sans-serif;
              font-size: 1rem;
              line-height: 1.5;
              color: #374151;
            }
            @media (min-width: 640px) {
              .tiptap-no-outline .ProseMirror {
                margin: 1.5rem;
                font-size: 1.1rem;
                line-height: 1.75;
              }
            }
          `,
        }}
      />
      <div className="min-h-screen transition-colors duration-300">
        <div className="max-w-5xl mx-auto mt-8">
          <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 mx-auto relative sm:border-none">
            <div
              className={`p-2 sm:p-4 md:p-6 sm:border-none prose prose-base sm:prose-lg leading-tight focus:outline-none max-w-none dark:border-green-950/10 transition-all duration-200 relative
              ${removeBorder ? '' : 'border border-gray-300 shadow'}
              dark:prose-invert`}
              ref={editorRef}
            >
              <div className="relative">
                <EditorContent
                  editor={editor}
                  className="tiptap-no-outline [&_.ProseMirror]:min-h-[calc(100vh-12rem)]"
                />
                {visible && suggestion && (
                <div
                  className="
                    absolute pointer-events-none 
                    text-gray-400 italic text-sm 
                    max-w-[90%] sm:max-w-[75%] md:max-w-[60%] 
                    truncate
                    overflow-hidden
                    whitespace-nowrap
                  "
                  style={{
                    top: position.top,
                    left: Math.min(position.left, editorRef.current?.offsetWidth - 100 || 0),
                  }}
                >
                  {suggestion}
                </div>)}

              </div>
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block fixed left-4 top-[20%] transform -translate-y-1/2 z-40 min-w-[5rem]">
          <AllMenu
            editor={editor}
            onWordCount={toggleWordCount}
            onRemoveBorder={toggleRemoveBorder}
            onToggle={requestSuggestion}
          />
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 shadow-md p-2">
          <div className="flex justify-between items-center">
            <AllMenu
              editor={editor}
              onWordCount={toggleWordCount}
              onRemoveBorder={toggleRemoveBorder}
            />
          </div>
        </div>

        {showWordCount && (
          <div className="fixed wordcount bottom-4 left-4 z-50 
                          bg-white/80 backdrop-blur-md px-4 py-2 rounded-lg 
                          shadow-lg text-sm text-gray-700 font-medium 
                          border border-gray-200">
            <WordCount editor={editor} />
          </div>)}


      </div>
    </>
  );
};

export default MyEditor;