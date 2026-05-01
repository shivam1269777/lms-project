import { AiFillCheckCircle } from "react-icons/ai";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom"; // ✅ should be 'react-router-dom', not 'react-router'

function CheckoutSuccess() {
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
        <div className="relative w-full max-w-sm md:max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_20px_black] text-center">
          
          <h1 className="bg-green-600 py-4 text-2xl md:text-3xl font-extrabold rounded-xl mb-6 text-white ">
            Payment Successful 🎉
          </h1>

          
          <div className="flex justify-center mb-4">
            <AiFillCheckCircle className="text-green-400 text-black text-6xl animate-bounce drop-shadow-[0_0_10px_rgba(0,255,100,0.5)]" />
          </div>

          
          <div className="space-y-3 mb-8">
            <h2 className="text-lg md:text-xl font-semibold text-green-300">
              Welcome to the Pro Bundle!
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Your subscription has been activated successfully.  
              You now have access to <span className="text-green-400 font-semibold">all premium courses</span>.
            </p>
          </div>

          
          <Link to="/">
            <button className="w-full py-3 text-lg md:text-xl font-bold bg-green-500 hover:bg-green-700 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(0,255,100,0.3)]">
              Go to Dashboard
            </button>
          </Link>

         
          <p className="text-gray-400 text-xs mt-5">
            Need help? Contact support anytime.
          </p>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CheckoutSuccess;
