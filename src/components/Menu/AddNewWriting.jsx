import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import handleNewWriting from "../../services/writingUtils"; // Adjust path as needed

export default function AddNewWriting() {
  const navigate = useNavigate();

  return (
    <button
      className="
        w-12 h-12 flex items-center justify-center
        rounded-full text-gray-600 bg-white
        hover:bg-green-300 hover:ring-green-600
        active:bg-green-100
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-green-500/20
        shadow-lg border border-gray-200
      "
      title="New Document"
      onClick={() => handleNewWriting(navigate)}
    >
      <Plus strokeWidth={2} size={20} />
    </button>
  );
}