import { useState, useRef, useEffect } from "react";


export default function TitleHeader({ title, setTitle, docID, isNew }) {
  const [isEditing, setIsEditing] = useState(isNew); // Start editing if new
  const inputRef = useRef(null);

  useEffect(() => {
    // Only try to load a saved title if this is not a brand new doc
    if (!isNew) {
      const savedTitle = localStorage.getItem(`editor-title-${docID}`);
      if (savedTitle) {
        setTitle(savedTitle);
        setIsEditing(false);
      }
    }
  }, [setTitle, docID, isNew]);

  const handleBlur = () => {
    const finalTitle = title.trim() === "" ? "Untitled" : title.trim();
    localStorage.setItem(`editor-title-${docID}`, finalTitle);
    setTitle(finalTitle);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRef.current.blur();
    }
  };

  const handleClick = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div className="w-fit px-4 py-1">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Enter title..."
          className="w-80 text-3xl font-semibold border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
        />
      ) : (
        <h1
          onClick={handleClick}
          className="text-3xl text-gray-600 titleHeading font-semibold cursor-pointer transition-colors"
        >
          {title}
        </h1>
      )}
    </div>
  );
}
