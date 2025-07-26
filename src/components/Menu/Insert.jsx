import { useRef } from 'react';
import { Link, Image } from 'lucide-react';

export default function Insert({ editor }) {
  const fileInputRef = useRef();

  const handleLinkClick = () => {
    const url = window.prompt('Enter a URL');
    if (!url) return;

    const { empty, from, to } = editor.state.selection;

    if (empty) {
      editor
        .chain()
        .focus()
        .insertContent([
          {
            type: 'text',
            text: url,
            marks: [{ type: 'link', attrs: { href: url } }],
          },
          {
            type: 'text',
            text: '\u200B',
          },
        ])
        .run();
      editor.commands.setTextSelection(from + url.length + 1);
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();

      editor.commands.setTextSelection(to);
      editor.chain().focus().insertContent('\u200B').run();
      editor.commands.setTextSelection(to + 1);
    }

    editor.chain().focus().unsetMark('link').run();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      editor.chain().focus().setImage({ src: base64 }).run();
    };
    reader.readAsDataURL(file);
  };

  const baseButton = `
    w-10 h-10 flex items-center justify-center
    rounded-full border border-gray-300
    text-gray-600 bg-white shadow-sm
    transition-all duration-200
    hover:ring-2 hover:ring-slate-200 hover:text-black
  `;

  return (
    <div className="flex gap-2 bg-slate-50 p-2 rounded-md">
      {/* Link Button */}
      <button
        onClick={handleLinkClick}
        className={baseButton}
        aria-label="Insert link"
        title="Insert link"
      >
        <Link strokeWidth={1.5} size={20} />
      </button>

      {/* Image Button */}
      <button
        onClick={() => fileInputRef.current.click()}
        className={baseButton}
        aria-label="Insert image"
        title="Insert image from device"
      >
        <Image strokeWidth={2} size={18} />
      </button>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}
