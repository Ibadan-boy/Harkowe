import generateSpectacularID from "../../services/generateID";
import { db } from '../../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Function to create a new Firestore document
export async function createNewFile(title = 'Untitled', content = '') {
  try {
    const docID = generateSpectacularID();
    const docRef = doc(db, 'documents', docID);

    await setDoc(docRef, {
      title: title || 'Untitled',
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      docID,
    });

    console.log(`✅ New file created with ID: ${docID}`);
    return docID;
  } catch (error) {
    console.error('❌ Error creating new file:', error);
    throw error;
  }
}

// Component with the "Add New" button
export default function AddNewWriting() {
  const navigate = useNavigate();

  const handleCreateFile = async () => {
    try {
      const newDocID = await createNewFile('', ''); // start with empty title
      navigate(`/editor/${newDocID}`); // redirect to editor
    } catch (error) {
      console.error("Error creating file:", error);
    }
  };

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
      onClick={handleCreateFile}
    >
      <Plus strokeWidth={2} size={20} />
    </button>
  );
}
