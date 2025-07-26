import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useEffect } from 'react';
import Image from '@tiptap/extension-image';
import TextFormattingMenu from './Menu/TextFormattingMenu';
import BlockTools from './Menu/BlockToolsMenu';
import Insert from './Menu/Insert';
import Link from '@tiptap/extension-link';
import AllInsert from './AllInsert';

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
,
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
    content: '', // Leave blank; we'll load from localStorage later
  });

  // Load content from localStorage once the editor is ready
  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (editor && savedContent) {
      editor.commands.setContent(savedContent);
    }
  }, [editor]);

  // Save content to localStorage on every update
  useEffect(() => {
    if (!editor) return;

    const saveContent = () => {
      const html = editor.getHTML();
      localStorage.setItem('editorContent', html);
    };

    editor.on('update', saveContent);

    return () => editor.off('update', saveContent); // clean up
  }, [editor]);

  // Add image functionality
  const addImage = useCallback(() => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
      return;
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <>
      <div>
        <TextFormattingMenu editor={editor} />
        <BlockTools editor={editor} />
        <AllInsert editor={editor} linkiImage={addImage} />
        
      </div>
      
      {/* Global styles to remove outlines */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .tiptap-no-outline .ProseMirror {
            outline: none;
            border: none;
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


        
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow border border-gray-200 prose prose-lg focus:outline-none">
          <EditorContent
            editor={editor}
            className="tiptap-no-outline outline-none focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror:focus]:outline-none [&_.ProseMirror]:min-h-[700px] [&_.ProseMirror]:leading-relaxed [&_.ProseMirror]:text-gray-700 rounded-md"
          />
        </div>
      </div>
    </>
  );
};

export default MyEditor;
