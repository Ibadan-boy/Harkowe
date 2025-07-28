import Insert from "./Menu/Insert";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function AllInsert({ editor }) {
  const [showInsert, setShowInsert] = useState(false);

  const toggleInsert = () => {
    setShowInsert((prev) => !prev);
  };

  return (
    <div className="relative inline-flex items-center">
      {/* Main Insert Button */}
      <button
        onClick={toggleInsert}
        className="
          w-10 h-10 flex items-center justify-center
          rounded-full
          text-gray-600 bg-white/80 backdrop-blur-sm
          hover:bg-blue-50 hover:text-blue-600
          active:bg-blue-100
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500/20
          shadow-sm border-0
        "
        aria-label="Insert Menu"
        title="Insert (Ctrl+I)"
      >
        <Plus strokeWidth={1.5} size={18} />
      </button>

      {/* Insert Menu Appears Close to the Button */}
      {showInsert && (
        <div className="absolute left-10 top-0 z-50">
          <Insert editor={editor} />
        </div>
      )}
    </div>
  );
}