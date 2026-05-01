import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../Redux/Slices/AuthSlice";
import { toast } from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setLoading(true);
    try {
      const resultAction = await dispatch(forgotPassword({ email }));
      if (forgotPassword.fulfilled.match(resultAction)) {
        toast.success(resultAction.payload.message);
        setEmail("");
      } else {
        toast.error(resultAction.payload?.message || "Failed to send reset link");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-zinc-800 px-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full max-w-md p-10 bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-700"
        >
          <h2 className="text-3xl font-extrabold text-yellow-400 text-center mb-2 ">
            Forgot Password
          </h2>
          <p className="text-gray-400 text-center mb-6">
            Enter your registered email address to receive a password reset link.
          </p>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-300 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-xl bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-yellow-600 hover:bg-yellow-500 py-3 rounded-xl font-semibold text-lg shadow-md transition flex justify-center items-center ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center mt-4 text-gray-400">
            <a
              href="/login"
              className="hover:text-yellow-400 transition font-medium"
            >
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
}
