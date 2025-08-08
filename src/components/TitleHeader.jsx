import { useState, useRef, useEffect } from "react";

export default function TitleHeader({ title, setTitle }) {
  const [isEditing, setIsEditing] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    const savedTitle = localStorage.getItem("editor-title");
    if (savedTitle) {
      setTitle(savedTitle);
      setIsEditing(false);
    }
  }, [setTitle]);

  const handleBlur = () => {
    if (title.trim() !== "") {
      localStorage.setItem("editor-title", title.trim());
      setIsEditing(false);
      console.log(title)
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRef.current.blur();
      console.log(title)
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
