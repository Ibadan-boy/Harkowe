import { useState } from "react";
import { motion } from "framer-motion";
import { auth, googleProvider, appleProvider } from "../services/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/allwritings");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApple = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, appleProvider);
      navigate("/allwritings");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/allwritings");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-800 p-4">
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            {[0, 0.2, 0.4].map((delay, i) => (
              <motion.span
                key={i}
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#86efac", // Tailwind's green-300
                  borderRadius: "50%"
                }}
                animate={{ y: ["0%", "-50%"] }}
                transition={{
                  y: { duration: 0.4, repeat: Infinity, ease: "easeOut" },
                  delay
                }}
              />
            ))}
          </div>
          <p className="text-green-300 font-medium">Signing you in...</p>
        </div>
      ) : (
        <div className="bg-green-700 rounded-2xl shadow-xl p-6 max-w-sm w-full">
          <h1 className="text-2xl text-green-400 font-bold text-center mb-6">
            {isSignUp ? "Create Account" : "Sign In"}
          </h1>

          {error && <p className="text-red-300 text-sm mb-4">{error}</p>}

          <form className="flex flex-col gap-4" onSubmit={handleEmailAuth}>
            <input
              type="email"
              placeholder="Email"
              className="border-2 border-gray-300 rounded-lg p-3 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border-2 border-gray-300 rounded-lg p-3 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-green-300"></div>
            <span className="px-3 text-green-500 text-sm">or</span>
            <div className="flex-grow h-px bg-green-300"></div>
          </div>

          <button
            onClick={handleGoogle}
            className="w-full border border-green-600 text-green-300 py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-green-600"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <button
            onClick={handleApple}
            className="w-full border border-green-600 text-green-300 py-3 rounded-lg flex justify-center items-center gap-2 mt-2 hover:bg-green-600"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple"
              className="w-5 h-5"
            />
            Continue with Apple
          </button>

          <p className="text-sm text-center mt-4">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-green-300 hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
