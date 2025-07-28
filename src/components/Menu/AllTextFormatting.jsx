import { useState } from "react";
import { TextCursorInput } from "lucide-react";
import TextFormattingMenu from "./TextFormattingMenu";

export default function AllTextFormatting({ editor }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(prev => !prev);

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleMenu}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-zinc-300 shadow-sm hover:shadow-md hover:bg-zinc-100 transition"
      >
        <TextCursorInput strokeWidth={2} size={20} className="w-4 h-4 text-zinc-700" />
      </button>

      {showMenu && (
        <div className="absolute z-10 top-full mt-2 w-48 bg-white shadow-lg border border-zinc-200 rounded-lg p-2 animate-fade-in">
          <TextFormattingMenu editor={editor}/>
        </div>
      )}
    </div>
  );
}
