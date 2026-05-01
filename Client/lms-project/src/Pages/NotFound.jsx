import { useNavigate } from "react-router";
import { motion } from "framer-motion";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#1A2238] via-[#273469] to-[#1A2238] text-white overflow-hidden px-6">
      
   
      {/* Animated 404 Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-widest drop-shadow-md z-10"
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="bg-yellow-500 text-black px-3 py-1 mt-3 text-sm sm:text-base rounded-md transform rotate-2 shadow-md z-10"
      >
        Page Not Found
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-6 text-gray-300 text-base sm:text-lg md:text-xl max-w-md leading-relaxed z-10"
      >
        Oops! The page you’re looking for doesn’t exist or may have been moved.
        Don’t worry — let’s get you back on track.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center z-10"
      >
        <button
          onClick={() => navigate(-1)}
          className="relative inline-block text-sm sm:text-base font-semibold text-yellow-500 border border-yellow-500 px-8 py-3 rounded-md hover:bg-yellow-500 hover:text-black transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Go Back
        </button>

        <button
          onClick={() => navigate("/")}
          className="relative inline-block text-sm sm:text-base font-semibold text-black bg-yellow-500 px-8 py-3 rounded-md hover:bg-yellow-400 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Back to Home
        </button>
      </motion.div>

      {/* Decorative Wave */}
      <svg
        className="absolute bottom-0 left-0 w-full h-32 sm:h-40 md:h-48"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#1A2238"
          fillOpacity="1"
          d="M0,288L48,272C96,256,192,224,288,208C384,192,480,192,576,197.3C672,203,768,213,864,218.7C960,224,1056,224,1152,197.3C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

    </div>
  );
}

export default NotFound;
