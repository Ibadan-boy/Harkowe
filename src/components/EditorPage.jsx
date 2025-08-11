import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import AllWritings from "../components/AllWritings";
import MyEditor from "../components/MyEditor";

export default function EditorPage() {
  const [writings, setWritings] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Load all documents for the list
  useEffect(() => {
    async function fetchDocs() {
      const colRef = collection(db, "documents");
      const snapshot = await getDocs(colRef);
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setWritings(docs);
    }
    fetchDocs();
  }, []);

  return (
    <>
      <AllWritings writings={writings} onSelect={setSelectedId} />
      {selectedId && <MyEditor docId={selectedId} />}
    </>
  );
}
