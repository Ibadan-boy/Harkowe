import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { askOpenRouter } from "../../services/openRouter";

export function useWhisperAI(editor, enabled) {
  const [suggestion, setSuggestion] = useState("");
  const [visible, setVisible] = useState(false);

  // Fetch suggestion
  const fetchSuggestion = useCallback(
    debounce(async () => {
      if (!editor) return;

      const text = editor.state.doc.textContent;
      if (!text || text.length < 20) return;

      try {
        const prompt = `Suggest a precise and helpful continuation or alternative. No comment about it, just your suggestion, straight to the point. If the reply is not a direct sentence for what I'm writing, I don't want it:\n\n${text}`;
        const response = await askOpenRouter(prompt);
        setSuggestion(response.trim());
        setVisible(true);
      } catch (err) {
        console.error("Whisper AI Error:", err);
      }
    }, 5000), // Trigger 5s after typing stops
    [editor]
  );

  // Insert suggestion at cursor
  const insertSuggestion = () => {
    if (!editor || !suggestion) return;

    editor.commands.insertContent(suggestion);
    setSuggestion("");
    setVisible(false);
  };

  // Subscribe to editor updates
  useEffect(() => {
    if (!enabled || !editor) return;

    const updateHandler = () => {
      fetchSuggestion();
    };

    editor.on("update", updateHandler);

    return () => {
      editor.off("update", updateHandler);
    };
  }, [enabled, editor, fetchSuggestion]);

  return {
    suggestion,
    visible,
    insertSuggestion,
  };
}
