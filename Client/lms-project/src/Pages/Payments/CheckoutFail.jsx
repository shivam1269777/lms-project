import { AiFillCloseCircle } from "react-icons/ai";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";

function CheckoutFail() {
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
        <div className="relative w-full max-w-sm md:max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_20px_black] text-center">
          {/* Header */}
          <h1 className="bg-red-700 py-4 text-2xl md:text-3xl font-extrabold rounded-xl mb-6 text-white shadow-[0_0_10px_rgba(255,0,0,0.4)]">
            Payment Failed ❌
          </h1>

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <AiFillCloseCircle className="text-red-600 text-6xl animate-pulse drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]" />
          </div>

          {/* Message */}
          <div className="space-y-3 mb-8">
            <h2 className="text-lg md:text-xl font-semibold text-red-400">
              Oops! Something went wrong.
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Your payment could not be processed.  
              Don’t worry — no amount has been deducted.
              <br />
              You can try again or contact our support team.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col justify-between">
            <Link to="/checkout">
              <button className="w-full mb-5 py-3 text-lg font-bold bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(255,0,0,0.3)]">
                Try Again
              </button>
            </Link>

            <Link to="/">
              <button className="w-full py-3 text-lg font-bold bg-gray-700 hover:bg-gray-600 rounded-xl transition-all duration-300">
                Go Home
              </button>
            </Link>
          </div>

          {/* Subtext */}
          <p className="text-gray-400 text-xs mt-6">
            If this issue persists, please contact{" "}
            <span className="text-red-400 underline cursor-pointer hover:text-red-300">
              support@shivamlms.com
            </span>
          </p>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CheckoutFail;
