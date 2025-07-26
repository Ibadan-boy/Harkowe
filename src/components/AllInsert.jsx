import Insert from "./Menu/Insert";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function AllInsert({ editor }) {
  const [showInsert, setShowInsert] = useState(false);

  const toggleInsert = () => {
    setShowInsert((prev) => !prev);
  };

  return (
    <div className="relative inline-block"> {/* Wrapper prevents background patch */}
      <div className="bg-transparent p-0 m-0"> {/* No white patch */}
        <button
          onClick={toggleInsert}
          className="
            w-10 h-10 flex items-center justify-center
            rounded-full border border-gray-300
            text-gray-600 bg-transparent
            hover:bg-blue-100/40 transition-all duration-200
            focus:outline-none
          "
          aria-label="Insert Menu"
          title="Insert (Ctrl+I)"
        >
          <Plus strokeWidth={1.5} size={18} />
        </button>
      </div>

      {showInsert && (
        <div className="absolute z-50 mt-2">
          <Insert editor={editor} />
        </div>
      )}
    </div>
  );
}
