import { useNavigate } from "react-router";

function Denied() {
  const navigate = useNavigate();

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-indigo-950  px-4 relative overflow-hidden">
      
      {/* Animated 403 */}
      <h1 className="text-[8rem] sm:text-[10rem] font-extrabold text-white tracking-widest drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-bounce-slow">
        403
      </h1>

      {/* Animated Rotated Label */}
      <div className="bg-black text-white  px-4 py-2 text-sm font-bold rounded rotate-12 absolute top-[45%] shadow-lg animate-pulse">
        Access Denied
      </div>

      {/* Description */}
      <p className="text-center text-gray-300 mt-6 max-w-xs text-sm">
        Sorry, you do not have permission to access this page.
      </p>

      {/* Go Back Button */}
      <button
        onClick={() => {
    // if there is history, go back
    if (window.history.length > 2) {
      navigate("/");
    } else {
      // fallback to a safe page, e.g., home
      navigate(-1);
    }
  }}
       className="mt-10 border-2 border-red-500 text-red-500 font-semibold px-8 py-3 rounded-lg 
  shadow-lg hover:bg-red-500 hover:text-white hover:shadow-red-400/40 transition-all duration-300 active:scale-95"
      >
        Go Back
      </button>
    </main>
  );
}

export default Denied;
