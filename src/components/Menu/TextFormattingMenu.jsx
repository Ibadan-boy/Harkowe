import { Italic, Strikethrough, Underline } from "lucide-react";

export default function TextFormattingMenu({ editor }) {
  const baseButton = `
    w-10 h-10 flex items-center justify-center
    rounded-full border border-gray-300
    text-gray-600 bg-white shadow-sm
    transition-all duration-200
    hover:ring-2 hover:ring-slate-200 hover:text-black
  `;

  return (
    <div className="flex gap-2 bg-slate-50 p-2 rounded-md">
      {/* Bold */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${baseButton} ${
          editor.isActive("bold") ? "ring-2 ring-blue-300 text-blue-700" : ""
        }`}
        aria-label="Toggle bold formatting"
        title="Bold (Ctrl+B)"
      >
        <strong className="text-[15px] font-semibold">B</strong>
      </button>

      {/* Italic */}
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${baseButton} ${
          editor.isActive("italic") ? "ring-2 ring-blue-300 text-blue-700" : ""
        }`}
        aria-label="Toggle italic formatting"
        title="Italic (Ctrl+I)"
      >
        <Italic strokeWidth={1.5} size={18} />
      </button>

      {/* Strikethrough */}
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${baseButton} ${
          editor.isActive("strike") ? "ring-2 ring-blue-300 text-blue-700" : ""
        }`}
        aria-label="Toggle strikethrough formatting"
        title="Strikethrough (Ctrl+Shift+S)"
      >
        <Strikethrough strokeWidth={2} size={18} />
      </button>

      {/* Underline */}
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${baseButton} ${
          editor.isActive("underline") ? "ring-2 ring-blue-300 text-blue-700" : ""
        }`}
        aria-label="Toggle underline formatting"
        title="Underline (Ctrl+U)"
      >
        <Underline strokeWidth={2.2} size={18} />
      </button>
    </div>
  );
}
