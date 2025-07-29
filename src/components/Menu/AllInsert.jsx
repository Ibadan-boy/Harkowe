import Insert from "./Insert";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function AllInsert({ editor }) {
  const [showInsert, setShowInsert] = useState(false);

  const toggleInsert = () => setShowInsert((prev) => !prev);

  return (
    <div className="relative inline-flex items-center">
      {/* Insert Toggle Button */}
      <button
        onClick={toggleInsert}
        className="
          w-10 h-10 flex items-center justify-center
          rounded-full text-gray-600
          hover:bg-blue-50 hover:text-blue-600
          active:bg-blue-100
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500/20
          shadow-sm border
        "
        aria-label="Insert Menu"
        title="Insert (Ctrl+I)"
      >
        <Plus strokeWidth={1.5} size={18} />
      </button>

      {/* Dropdown Menu */}
      {showInsert && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50">
          <div className="flex gap-2 bg-white p-2 rounded-full shadow border border-gray-200">
            <Insert editor={editor} />
          </div>
        </div>
      )}
    </div>
  );
}
