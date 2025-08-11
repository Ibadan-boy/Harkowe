import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import MyEditor from "./MyEditor";
import Header from "./Header";
import { db } from "../services/firebase";

export default function AllEditor() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [isNew, setIsNew] = useState(false); // Track if doc is new

  useEffect(() => {
    const fetchDoc = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, "documents", id);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          // Existing document
          const data = snapshot.data();
          setTitle(data.title || "");
          setIsNew(false);
        } else {
          //create new document in Firestore
          await setDoc(docRef, {
            title: "",
            content: "",
            updatedAt: new Date()
          });
          setIsNew(true);
        }
      } catch (err) {
        console.error("Error loading document:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoc();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header title={title} setTitle={setTitle} docID={id} isNew={isNew} />
      <MyEditor title={title} docID={id} />
    </>
  );
}
