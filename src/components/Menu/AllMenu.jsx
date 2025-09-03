import { useState } from "react";
import { Menu } from "lucide-react";
import TextFormattingMenu from "./TextFormattingMenu";
import BlockTools from "./BlockToolsMenu";
import Insert from "./Insert";
import Utilities from "./Utilities";
import { useNavigate } from "react-router-dom";
import GoHome from "./GoHome";
import AddNewWriting from "./AddNewWriting";

export default function AllMenu({ editor, onWordCount, onRemoveBorder, enabled, onToggle }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setShowMenu((prev) => !prev);

  if (!editor) return null;

  function goHome() {
    console.log('Clicked Home');
    navigate('/allwritings');
  }

  return (
    <div className="relative z-50">
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
        title="Menu"
      >
        <Menu size={24} />
      </button>

      {showMenu && (
        <div
          className="
            absolute 
            top-0 mt-2 
            left-full ml-2
            bg-white p-2 rounded-lg shadow-md border border-gray-200
            w-48 max-w-[90vw]
            sm:w-56
            lg:w-64
          "
        >
          <div className="flex flex-col space-y-1">
            <GoHome onClick={goHome} />
            <AddNewWriting />
            <TextFormattingMenu editor={editor} />
            <BlockTools editor={editor} />
            <Insert editor={editor} />
            <Utilities
              onUndo={() => editor.chain().focus().undo().run()}
              onRedo={() => editor.chain().focus().redo().run()}
              onWordCount={onWordCount}
              onRemoveBorder={onRemoveBorder}
              enabled={enabled}
              onToggle={onToggle}
            />
          </div>
        </div>
      )}
    </div>
  );
}