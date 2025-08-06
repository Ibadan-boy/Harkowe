import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { askOpenRouter } from "../../services/openRouter";

export function useWhisperAI(editor, enabled) {
  const [suggestion, setSuggestion] = useState("");
  const [visible, setVisible] = useState(false);

  // Fetch suggestion with debounce
  const debouncedFetchSuggestion = useCallback(
    debounce(async (prevText) => {
      if (!editor || editor.isDestroyed) return;
      const text = editor.state.doc.textContent;
      if (!text || text.length < 20 || text === prevText) return;

      try {
        const prompt = `Suggest a precise and helpful continuation or alternative. No comment about it, just your suggestion, straight to the point. If the reply is not a direct sentence for what I'm writing, I don't want it:\n\n${text}`;
        const response = await askOpenRouter(prompt);
        
        setSuggestion(response.trim());
        setVisible(true);
      } catch (err) {
        console.error("Whisper AI Error:", err);
      }
    }, 1000), // Reduced to 1s for better UX
    [editor]
  );

  // Insert suggestion at cursor
  const insertSuggestion = () => {
    if (!editor || editor.isDestroyed || !suggestion) return;

    try {
      editor.commands.insertContent(suggestion);
      setSuggestion("");
      setVisible(false);
    } catch (err) {
      console.error("Insert Suggestion Error:", err);
    }
  };

  // Subscribe to editor updates
  useEffect(() => {
    if (!enabled || !editor || editor.isDestroyed) return;
    let prevText = editor.state.doc.textContent;

    const updateHandler = () => {
      if (editor.isDestroyed) return;
      debouncedFetchSuggestion(prevText);
      prevText = editor.state.doc.textContent;
    };

    editor.on("update", updateHandler);

    return () => {
      if (!editor.isDestroyed) {
        editor.off("update", updateHandler);
      }
      debouncedFetchSuggestion.cancel();
    };
  }, [enabled, editor, debouncedFetchSuggestion]);

  return {
    suggestion,
    visible,
    insertSuggestion,
  };
}