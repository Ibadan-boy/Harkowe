// src/components/AiWhisperToggle.jsx
import { Brain, BrainCircuit } from "lucide-react";

export default function AiWhisperToggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
        enabled ? "bg-red-600 text-white hover:bg-red-800" : "bg-green-600 hover:bg-green-700 text-white"
      }`}
    >
      {enabled ? <Brain size={20} strokeWidth={2}/> : <BrainCircuit size={20} strokeWidth={2}/>}
    </button>
  );
}
