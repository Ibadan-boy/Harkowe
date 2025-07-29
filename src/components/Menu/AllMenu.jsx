import { useState } from "react";
import { Menu } from "lucide-react";
import TextFormattingMenu from "./TextFormattingMenu";
import BlockTools from "./BlockToolsMenu";
import Insert from "./Insert";
import Utilities from "./Utilities";

export default function AllMenu({ editor, onWordCount }) {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu((prev) => !prev);
  if (!editor) return null;

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="
          w-12 h-12 flex items-center justify-center
          rounded-full text-gray-600 bg-white
          hover:bg-green-300 hover:text-green-600
          active:bg-green-100
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-green-500/20
          shadow-lg border border-gray-200
        "
        aria-label="Menu"
        title="Menu (Ctrl+M)"
      >
        <Menu />
      </button>

      {showMenu && (
        <div className="absolute left-full ml-4 top-0 z-50 bg-white p-3 rounded-lg shadow-xl border border-gray-200 space-y-3 min-w-max">
          <TextFormattingMenu editor={editor} />
          <BlockTools editor={editor} />
          <Insert editor={editor} />
          <Utilities
            onUndo={() => editor.chain().focus().undo().run()}
            onRedo={() => editor.chain().focus().redo().run()}
            onWordCount={onWordCount}
          />
        </div>
      )}
    </div>
  );
}
