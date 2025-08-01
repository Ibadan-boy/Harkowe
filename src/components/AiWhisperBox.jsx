import { motion, AnimatePresence } from 'framer-motion';

const AiWhisperBox = ({ suggestion, visible, position }) => {
  return (
    <AnimatePresence>
      {visible && suggestion && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'absolute',
            top: position.top + 12, // slightly offset below cursor
            left: position.left,
            zIndex: 100,
          }}
          className="bg-white text-sm shadow-lg rounded-xl px-4 py-3 max-w-md border border-gray-200"
        >
          <p className="text-gray-800 italic">{suggestion}</p>
          <p className="mt-2 text-xs text-gray-400">
            Press <kbd className="px-1 py-0.5 bg-gray-100 border rounded text-gray-700">Tab</kbd> to accept
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AiWhisperBox;
