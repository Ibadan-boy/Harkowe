import { getAuth } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase"; // Adjust the path to your Firebase config
import generateSpectacularID from "../services/generateID";

const handleNewWriting = async (navigate) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const newId = generateSpectacularID();

    const newDoc = {
      title: "Untitled",
      content: "",
      updatedAt: new Date(),
      docID: newId,
      userId: user.uid, // Link document to logged-in user
    };

    // Save to Firestore
    await setDoc(doc(db, "documents", newId), newDoc);

    // Navigate to the new document's editor
    navigate(`/editor/${newId}`);
    
    // Return the new document data for local state updates if needed
    return { id: newId, ...newDoc };
  } catch (error) {
    console.error("Error creating new writing:", error);
    throw error; // Let the calling component handle errors
  }
};

export default handleNewWriting;