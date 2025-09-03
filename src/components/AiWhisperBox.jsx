import { motion, AnimatePresence } from "framer-motion";

const AiWhisperBox = ({ suggestion, visible }) => {
  return (
    <AnimatePresence>
      {visible && suggestion && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400 italic"
        >
          {suggestion}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default AiWhisperBox;
