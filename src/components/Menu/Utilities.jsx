import { Wrench, Tally5, Undo2, Redo2 } from "lucide-react";

export default function Utilities({ onUndo, onRedo, onWordCount }) {
  const baseButton = `
    w-10 h-10 flex items-center justify-center
    rounded-full border border-gray-300
    text-gray-600 bg-white shadow-sm
    transition-all duration-200
    hover:ring-2 hover:ring-slate-200 hover:text-black
  `;

  return (
    <div className="flex gap-2 p-2 bg-slate-50 rounded-md">
      {/* Settings / Tools */}
      <button className={baseButton} title="Settings">
        <Wrench size={20} strokeWidth={1.5} />
      </button>

      {/* Word Count or Metrics */}
      <button className={baseButton}
        onClick={onWordCount}
        aria-label="Word Count"
      title="Word Count">
        <Tally5 size={20} strokeWidth={1.5} />
      </button>

      {/* Undo */}
      <button
        onClick={onUndo}
        className={baseButton}
        title="Undo (Ctrl+Z)"
      >
        <Undo2 size={20} strokeWidth={1.5} />
      </button>

      {/* Redo */}
      <button
        onClick={onRedo}
        className={baseButton}
        title="Redo (Ctrl+Shift+Z)"
      >
        <Redo2 size={20} strokeWidth={1.5} />
      </button>
    </div>
  );
}
