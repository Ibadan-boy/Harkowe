import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function WordCount({ editor }){

    const [wordCount, setWordCount] = useState(0);
    const [ showOtherCounts, setShowOtherCounts ] = useState(false);

    const toggleOtherCounts = () => setShowOtherCounts((prev) => !prev);

    useEffect(() => {
        if (!editor) return;
        const updateWordCount = () => {
            const text = editor.getText();
            const words = text.trim().split(/\s+/).filter(Boolean);
            setWordCount(words.length);
        };
        updateWordCount();
        editor.on("update", updateWordCount);
        return () => editor.off("update", updateWordCount);
    }, [editor]);

    return (
        <>
        <div onClick={toggleOtherCounts} className="text-sm wordCount1 cursor-pointer text-gray-600">
            <span className="font-semibold">{wordCount} words</span>
            <ChevronDown className={`inline-block mr-1 hover:bg-gray-300 rounded-lg transition-transform ${showOtherCounts ? 'transform rotate-180 hover:bg-gray-300 rounded-lg' : ''}`} size={14} />
        </div>

        { showOtherCounts && <div className="wordCount1 ">
            <div className="text-sm text-gray-600">
                Character Count: <span className="font-semibold">{editor.getText().length}</span>
            </div>
            <div className="text-sm text-gray-600">
                Paragraph Count: <span className="font-semibold">{editor.getText().split('\n').filter(p => p.trim()).length}</span>
            </div>
            <div className="text-sm text-gray-600">
                Line Count: <span className="font-semibold">{editor.getText().split('\n').length}</span>
            </div>
        </div>}
        
        </>
    )
}