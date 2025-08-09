import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react"; // <-- import icon

export default function AllWritings() {
  const [writings, setWritings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWritings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "documents"));
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-900">
        <p className="text-green-200 text-lg animate-pulse">
          Loading your writings...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-900 text-green-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-300">
        My Writings
      </h1>
      {writings.length === 0 ? (
        <p className="text-center text-green-400">
          No writings yet. Start creating something!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {writings.map((writing) => (
            <div
              key={writing.id}
              className="relative p-4 bg-green-800 rounded-xl shadow-md hover:shadow-lg hover:bg-green-700 transition transform hover:-translate-y-1"
            >
              {/* Three dots menu button */}
              <button className="absolute top-3 right-3 p-1 rounded-full hover:bg-green-600 transition">
                <MoreVertical className="w-5 h-5 text-green-200" />
              </button>

              <Link to={`/writing/${writing.id}`}>
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
