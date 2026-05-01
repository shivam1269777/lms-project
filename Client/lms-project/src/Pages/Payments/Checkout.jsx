
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getRazorPayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { getUserData } from "../../Redux/Slices/AuthSlice";
function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const userData = useSelector((state) => state?.auth?.data);

  const [loading, setLoading] = useState(false);

  // Load Razorpay key on component mount
  useEffect(() => {
    const loadKey = async () => {
      try {
        setLoading(true);
        await dispatch(getRazorPayId());
      } catch (err) {
        toast.error(err.message || "Failed to load Razorpay key");
      } finally {
        setLoading(false);
      }
    };
    loadKey();
  }, [dispatch]);

  // Handle subscription purchase
  const handleSubscription = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Create subscription via backend
      const subscriptionResponse = await dispatch(purchaseCourseBundle());
      const subscriptionId = subscriptionResponse.payload?.subscription_id;

      if (!razorpayKey || !subscriptionId) {
        toast.error("Payment initialization failed. Please try again.");
        return;
      }

      const options = {
        key: razorpayKey,
        subscription_id: subscriptionId,
        name: "Shivam's Private Limited",
        description: "Course Subscription",
        theme: { color: "#F37254" },
        prefill: { email: userData?.email, name: userData?.fullName },
        handler: async function (response) {
          const paymentDetails = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            razorpay_subscription_id: response.razorpay_subscription_id,
          };

          const resultAction = await dispatch(
            verifyUserPayment(paymentDetails)
          );

          if (resultAction.payload?.success) {
            navigate("/checkout/success");
              await dispatch(getUserData());
          } else {
            navigate("/checkout/fail");
          }
        },
        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled by user");
          },
        },
      };

      // Open Razorpay checkout
      new window.Razorpay(options).open();
    } catch (err) {
      toast.error(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

return(   <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4"
      >
        <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg p-8 rounded-2xl shadow-[0_0_10px_black] bg-white/10 backdrop-blur-md text-white border border-white/20 transition-transform hover:scale-[1.02] duration-300">
          <h1 className="text-center text-3xl font-extrabold text-yellow-400 mb-6 drop-shadow-lg">
            Premium Subscription
          </h1>

          <p className="text-gray-200 text-center text-[16px] leading-relaxed mb-8">
            Unlock access to <span className="font-semibold text-yellow-400">all courses</span> for{" "}
            <span className="font-semibold text-yellow-400">1 year</span>. Enjoy unlimited learning with new content added regularly.
          </p>

          <div className="flex flex-col items-center justify-center gap-2 mb-6">
            <p className="flex items-center text-3xl font-bold text-yellow-400">
              <BiRupee />
              499
            </p>
            <p className="text-gray-300 text-sm">One-time payment • 100% Refund on Cancellation*</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-xl font-bold rounded-xl transition-all duration-300 
              ${loading ? "bg-yellow-600 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-500"} 
              text-gray-900 shadow-lg shadow-yellow-500/30`}
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>

          <div className="text-center mt-6 text-gray-400 text-sm">
            <p>Secure payments powered by Razorpay 🔒</p>
            <p className="text-xs mt-1">Terms and conditions apply</p>
          </div>
        </div>
      </form>
    </HomeLayout>
  );
}

export default Checkout;
