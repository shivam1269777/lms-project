import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { changePassword } from "../../Redux/Slices/AuthSlice";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword } = passwords;
    if (!oldPassword || !newPassword) {
      toast.error("All fields are mandatory");
      return;
    }

    setLoading(true);
    try {
      await dispatch(changePassword({ oldPassword, newPassword })).unwrap();
      toast.success("Password changed successfully!");
      setPasswords({ oldPassword: "", newPassword: "" });

      // Navigate to profile page
      navigate("/user/profile");
    } catch (error) {
      // Errors handled by thunk toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-zinc-800 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md p-8 bg-zinc-900 rounded-xl shadow-lg border border-zinc-700"
      >
        <h2 className="text-3xl font-bold text-yellow-500 text-center mb-2">
          Change Password
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Update your account password securely
        </p>

        <div className="flex flex-col gap-2">
          <label htmlFor="oldPassword" className="text-gray-300 font-medium">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            placeholder="Enter old password"
            value={passwords.oldPassword}
            onChange={handleChange}
            className="px-4 py-2 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="newPassword" className="text-gray-300 font-medium">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="Enter new password"
            value={passwords.newPassword}
            onChange={handleChange}
            className="px-4 py-2 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-yellow-600 hover:bg-yellow-500 py-3 rounded-md font-semibold text-lg transition-all ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
