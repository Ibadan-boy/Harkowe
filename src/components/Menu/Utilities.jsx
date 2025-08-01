import { Wrench, Tally5, Undo2, Redo2, SquareDashed } from "lucide-react";
import AiWhisperToggle from "../AiWhisperToggle";

export default function Utilities({ onUndo, onRedo, onWordCount, onRemoveBorder, enabled, onToggle }) {
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
      
        <AiWhisperToggle enabled={enabled} onToggle={onToggle}/>
      

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

      {/* Remove border */}
      <button
        onClick={onRemoveBorder}
        className={baseButton}
        title="Remove Border"
      >
        <SquareDashed size={20} strokeWidth={1.5} />
      </button>
    </div>
  );
}
