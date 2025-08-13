import { useEffect, useState } from "react";
import { collection, getDocs, setDoc, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";
import { MoreVertical, Plus } from "lucide-react";
import { getAuth } from "firebase/auth";
import generateSpectacularID from "../services/generateID";

export default function AllWritings() {
  const [writings, setWritings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState(null); // Tracks which writing's menu is open
  const navigate = useNavigate();

  // Fetch only writings belonging to the logged-in user
  useEffect(() => {
    const fetchWritings = async () => {
      setLoading(true);
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          console.error("User not logged in");
          setWritings([]);
          return;
        }

        // Create a query to fetch documents where userId matches the logged-in user's UID
        const writingsQuery = query(
          collection(db, "documents"),
          where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(writingsQuery);
        const docsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : null,
          };
        });

        setWritings(docsData);
      } catch (error) {
        console.error("Error fetching writings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWritings();
  }, []);

  // Handle creating a new writing
  const handleNewWriting = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User not logged in");
        return;
      }

      const newId = generateSpectacularID();

      // Set a new document in Firestore with the logged-in user's UID
      await setDoc(doc(db, "documents", newId), {
        title: "Untitled",
        content: "",
        updatedAt: new Date(),
        docID: newId,
        userId: user.uid, // Link document to current user
      });

      navigate(`/editor/${newId}`);
    } catch (error) {
      console.error("Error creating new writing:", error);
    }
  };

  // Handle deleting a writing
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "documents", id));
      setWritings((prev) => prev.filter((w) => w.id !== id));
    } catch (error) {
      console.error("Error deleting writing:", error);
    }
  };

  // Handle renaming a writing
  const handleRename = async (id) => {
    const newTitle = prompt("Enter new title:");
    if (newTitle) {
      try {
        await updateDoc(doc(db, "documents", id), { title: newTitle });
        setWritings((prev) =>
          prev.map((w) => (w.id === id ? { ...w, title: newTitle } : w))
        );
      } catch (error) {
        console.error("Error renaming writing:", error);
      }
    }
  };

  // Handle sharing a writing
  const handleShare = (id) => {
    const link = `${window.location.origin}/editor/${id}`;
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-emerald-900">
        <p className="text-green-200 text-lg animate-pulse">
          Loading your writings...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-900 text-green-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-300">My Writings</h1>
        <button
          onClick={handleNewWriting}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus size={18} />
          New Writing
        </button>
      </div>

      {writings.length === 0 ? (
        <p className="text-center text-green-400">
          No writings yet. Start creating something!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {writings.map((writing) => (
            <div
              key={writing.id}
              className="relative overflow-visible p-4 bg-emerald-900 rounded-xl shadow-md hover:shadow-lg hover:bg-emerald-800 transition transform hover:-translate-y-1"
            >
              {/* Three dots menu button */}
              <button
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-emerald-700 transition"
                onClick={() =>
                  setOpenMenuId(openMenuId === writing.id ? null : writing.id)
                }
              >
                <MoreVertical className="w-5 h-5 text-green-200" />
              </button>

              {/* Dropdown Menu */}
              {openMenuId === writing.id && (
                <div className="absolute top-10 right-3 bg-emerald-800 border border-emerald-700 rounded-lg shadow-lg z-10 w-32">
                  <button
                    onClick={() => handleDelete(writing.id)}
                    className="block w-full text-left px-4 py-2 hover:bg-emerald-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleRename(writing.id)}
                    className="block w-full text-left px-4 py-2 hover:bg-emerald-700"
                  >
                    Rename
                  </button>
                  <button
                    onClick={() => handleShare(writing.id)}
                    className="block w-full text-left px-4 py-2 hover:bg-emerald-700"
                  >
                    Share
                  </button>
                </div>
              )}

              <Link to={`/editor/${writing.id}`}>
                <h2 className="text-xl font-semibold text-green-200 mb-2 truncate">
                  {writing.title || "Untitled"}
                </h2>
                {writing.updatedAt && (
                  <p className="text-green-400 text-sm">
                    Updated: {writing.updatedAt.toLocaleDateString()}
                  </p>
                )}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
