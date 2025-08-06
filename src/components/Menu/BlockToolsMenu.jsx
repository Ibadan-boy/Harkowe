import {
  Heading,
  CodeXml,
  Minus,
  List,
  ListOrdered
} from "lucide-react";
import { useState } from "react";
import HeadingButtons from "./HeadingButtons";

export default function BlockTools({ editor }) {
  const [headingIsActive, setHeadingIsActive] = useState(false);

  function toggleHeading() {
    setHeadingIsActive(!headingIsActive);
  }

  const baseButton = `
    w-10 h-10 flex items-center justify-center
    rounded-full border border-gray-300
    text-gray-600 bg-white
    shadow-sm
    transition-all duration-200
    hover:ring-2 hover:ring-slate-200 hover:text-black
  `;

  return (
    <div className="flex gap-2 bg-slate-50 p-2 rounded-md">
      {/* Heading toggle */}
      <button
        onClick={toggleHeading}
        className={`${baseButton} ${headingIsActive ||
          editor.isActive("heading", { level: 1 }) ||
          editor.isActive("heading", { level: 2 }) ||
          editor.isActive("heading", { level: 3 })
            ? "ring-2 ring-green-300 text-green-700"
            : ""
        }`}
        aria-label="Heading formatting"
        title="Heading options"
      >
        <Heading strokeWidth={3} size={18} />
      </button>

      {headingIsActive && (
        <HeadingButtons
          editor={editor}
          setHeadingIsActive={setHeadingIsActive}
        />
      )}

      {/* Code block */}
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${baseButton} ${
          editor.isActive("codeBlock")
            ? "ring-2 ring-blue-300 text-blue-700"
            : ""
        }`}
        aria-label="Toggle code block"
        title="Code Block"
      >
        <CodeXml strokeWidth={2} size={20} />
      </button>

      {/* Horizontal rule */}
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={baseButton}
        aria-label="Add horizontal line"
        title="Horizontal Rule"
      >
        <Minus strokeWidth={1.5} size={18} />
      </button>

      {/* Ordered list */}
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${baseButton} ${
          editor.isActive("orderedList")
            ? "ring-2 ring-blue-300 text-blue-700"
            : ""
        }`}
        aria-label="Numbered List"
        title="Numbered List"
      >
        <ListOrdered strokeWidth={1.5} size={18} />
      </button>

      {/* Bullet list */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${baseButton} ${
          editor.isActive("bulletList")
            ? "ring-2 ring-blue-300 text-blue-700"
            : ""
        }`}
        aria-label="Bullet List"
        title="Bullet List"
      >
        <List strokeWidth={1.5} size={18} />
      </button>
    </div>
  );
}
