import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useEffect } from 'react';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import AllMenu from './Menu/AllMenu';
import WordCount from './WordCount';
import { useState } from 'react';

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

const MyEditor = () => {
  const editor = useEditor({
    extensions,
    content: '',
  });

  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (editor && savedContent) {
      editor.commands.setContent(savedContent);
    }
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    const saveContent = () => {
      const html = editor.getHTML();
      localStorage.setItem('editorContent', html);
    };

    editor.on('update', saveContent);
    return () => editor.off('update', saveContent);
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const [ showWordCount, setShowWordCount ] = useState(false);

  const toggleWordCount = () => setShowWordCount((prev) => !prev);

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
          .tiptap-no-outline .ProseMirror:focus {
            outline: none;
            box-shadow: none;
            border: none;
          }
          .tiptap-no-outline .ProseMirror:focus-visible {
            outline: none;
          }
        `,
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 font-writing relative">
        <div className="max-w-5xl mx-auto">
          {/* Editor area - takes full width without menu constraints */}
          <div className="max-w-5xl mx-auto relative">
            {/* Editor area */}
            <div className="bg-white p-8 shadow border border-gray-200 prose prose-lg focus:outline-none max-w-none">
              <EditorContent
                editor={editor}
                className="tiptap-no-outline outline-none focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror:focus]:outline-none [&_.ProseMirror]:font-writing [&_.ProseMirror]:min-h-[800px] [&_.ProseMirror]:leading-relaxed [&_.ProseMirror]:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Menu positioned as a floating element on the left side, slightly higher than center */}
        <div className="fixed left-8 top-[20%] transform -translate-y-1/2 z-50">
          <AllMenu editor={editor} onWordCount={toggleWordCount}/>
        </div>
      </div>

      {/* Word Count positioned at bottom right */}
      { showWordCount && <div className="fixed bottom-4 left-8 z-50 bg-gray-300 backdrop-blur px-3 py-1 rounded-md shadow text-sm text-gray-600">
        <WordCount editor={editor} />
      </div>}

    </>
  );
};

export default MyEditor;

