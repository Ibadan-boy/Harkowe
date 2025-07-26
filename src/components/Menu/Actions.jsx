import { Undo, Redo, Save, ArrowLeftRight } from "lucide-react";
import { useState } from "react";

function TheActions({ editor }) {
  const canUndo = editor?.can().undo();
  const canRedo = editor?.can().redo();

  return (
    <div className="flex gap-1 bg-slate-50 p-2 rounded-md border border-slate-200 shadow-sm">
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!canUndo}
        className="
          w-10 h-10 flex items-center justify-center
          rounded-full border border-gray-300
          text-gray-600 bg-white
          shadow-sm
        "

        aria-label="Undo"
        title="Undo (Ctrl+Z)"
      >
        <Undo strokeWidth={1.5} size={20} />
      </button>

      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!canRedo}
        className="
          w-10 h-10 flex items-center justify-center
          rounded-full border border-gray-300
          text-gray-600 bg-white
          shadow-sm
        "

        aria-label="Redo"
        title="Redo (Ctrl+Shift+Z)"
      >
        <Redo strokeWidth={1.5} size={20} />
      </button>

      <button
        onClick={() => alert("Save functionality not implemented yet")}
        className="
          w-10 h-10 flex items-center justify-center
          rounded-full border border-gray-300
          text-gray-600 bg-white
          shadow-sm
        "

        aria-label="Save"
        title="Save (Ctrl+S)"
      >
        <Save strokeWidth={1.5} size={20} />
      </button>
    </div>
  );
}

export default function Actions({ editor }) {
  const [showActions, setShowActions] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowActions(prev => !prev)}
        className={`
          px-3 py-2 rounded-md border transition-all duration-150 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
          ${showActions 
            ? 'border-blue-300 bg-blue-100 text-blue-700' 
            : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:border-slate-400'}
        `}
        aria-label={showActions ? "Hide actions" : "Show actions"}
        aria-expanded={showActions}
        title="Toggle actions menu"
      >
        <ArrowLeftRight strokeWidth={1.5} size={20} />
      </button>

      {showActions && <TheActions editor={editor} />}
    </>
  );
}
