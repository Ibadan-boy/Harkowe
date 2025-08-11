import { motion } from 'framer-motion';
import imgHeader from '../assets/file-text.svg';
import { useNavigate } from 'react-router-dom';

// Props:
// - onCTA: function to call when CTA is clicked (optional)
// - ctaText: string for button text (default: "Get Started")
export default function AnimatedLanding({ onCTA = () => {}, ctaText = 'Get Started' }) {
  const navigate = useNavigate();

  function handleCTA() {
    navigate("/signup");
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="flex items-center bg-green-700 justify-center gap-4">
        <img
          src={imgHeader}
          alt="Harkowe logo"
          className="w-9 h-9"
        />
        <h1 className="text-2xl font-bold font-writing text-green-800 dark:text-green-300">
          <span className="text-green-800 dark:text-green-300">Har</span>
          <span className="text-gray-600 dark:text-gray-300">kowe</span>
        </h1>
      </div>

      {/* Landing Page Background */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-700 via-green-600 to-green-800 p-6">
        
        {/* Card Container (semi-transparent so gradient shows through) */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-md w-full bg-green-700/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl"
          role="region"
          aria-label="Welcome card"
        >
          {/* Header: make background TRANSPARENT to avoid stacking two translucent greens */}
          <div className="text-center rounded-md mb-6 p-4 bg-white/8">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-2xl font-extrabold text-white"
            >
              Welcome to Your Writing Space
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 1.0 }}
              className="text-l mt-2 text-white/80"
            >
              A calm place to shape the words that matter.
            </motion.p>
          </div>

          {/* Main Content */}
          <main className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 1.5 }}
              className="px-4 py-3 bg-white/5 rounded-lg"
            >
              <p className="text-white/90 text-l">
                Join now to save drafts, track changes, and show your writing the respect it deserves — one line at a time.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex justify-center"
            >
              <motion.button
                onClick={handleCTA}
                aria-label={ctaText}
                className="w-full max-w-sm rounded-md py-3 px-6 font-semibold text-green-900 bg-white shadow hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30"
                whileHover={{ boxShadow: '0px 10px 30px rgba(255,255,255,0.06)' }}
                animate={{
                  boxShadow: [
                    '0px 6px 18px rgba(0,0,0,0.06)',
                    '0px 12px 30px rgba(0,0,0,0.08)',
                    '0px 6px 18px rgba(0,0,0,0.06)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'loop' }}
              >
                {ctaText}
              </motion.button>
            </motion.div>

            {/* Sign-in link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-center text-sm text-white/60"
            >
              <span>Already a member?</span>
              <button
                onClick={() => onCTA('signin')}
                className="ml-2 underline underline-offset-2 text-white/90"
              >
                Sign in
              </button>
            </motion.div>
          </main>
        </motion.div>
      </div>
    </>
  );
}
