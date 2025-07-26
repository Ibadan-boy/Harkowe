import { Heading1, Heading2, Heading3 } from "lucide-react";

export default function HeadingButtons({ editor, setHeadingIsActive }) {
  const baseButton = `
    w-10 h-10 flex items-center justify-center
    rounded-full border border-gray-300
    text-gray-600 bg-white
    shadow-sm
  `;

  return (
    <div className="flex gap-2">
      {/* H1 Button */}
      <button
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 1 }).run();
          setHeadingIsActive(false);
        }}
        className={`${baseButton} ${
          editor.isActive("heading", { level: 1 })
            ? "ring-2 ring-blue-300 text-blue-700"
            : ""
        }`}
        title="Heading 1"
      >
        <Heading1 className="w-5 h-5" />
      </button>

      {/* H2 Button */}
      <button
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
          setHeadingIsActive(false);
        }}
        className={`${baseButton} ${
          editor.isActive("heading", { level: 2 })
            ? "ring-2 ring-blue-300 text-blue-700"
            : ""
        }`}
        title="Heading 2"
      >
        <Heading2 className="w-5 h-5" />
      </button>

      {/* H3 Button */}
      <button
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 3 }).run();
          setHeadingIsActive(false);
        }}
        className={`${baseButton} ${
          editor.isActive("heading", { level: 3 })
            ? "ring-2 ring-blue-300 text-blue-700"
            : ""
        }`}
        title="Heading 3"
      >
        <Heading3 className="w-5 h-5" />
      </button>
    </div>
  );
}
