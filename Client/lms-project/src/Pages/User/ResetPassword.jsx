import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { resetPassword } from "../../Redux/Slices/AuthSlice";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return toast.error("Please enter a new password");

    setLoading(true);
    try {
      const res = await dispatch(resetPassword({ resetToken, password })).unwrap();
      toast.success(res.message || "Password reset successfully!");
      setPassword("");
      navigate("/login");
    } catch (err) {
      toast.error(err?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-zinc-800 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md p-10 bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-700"
      >
        <h2 className="text-3xl font-extrabold text-yellow-400 text-center mb-2">
          Reset Password
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Enter your new password below to reset your account.
        </p>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-gray-300 font-medium">
            New Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
