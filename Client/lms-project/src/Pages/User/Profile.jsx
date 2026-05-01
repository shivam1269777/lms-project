import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // React icon for default profile
import { Link, useNavigate } from "react-router";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";

function Profile() {
  const userData = useSelector((state) => state?.auth?.data);
  const [imageError, setImageError] = useState(false);
  const navigate=useNavigate();
const dispatch=useDispatch();
async function handleCancellation(){
await dispatch(cancelCourseBundle());
await dispatch(getUserData());
toast.success("Cancellation completed");
navigate("/")
}  

  return (
    <HomeLayout>
     <div className="min-h-[90vh] flex items-center justify-center bg-zinc-900 p-4">
  <div className="flex flex-col gap-4 rounded-lg p-6 text-white w-full max-w-sm sm:max-w-md md:max-w-lg shadow-[0_0_15px_rgba(0,0,0,0.5)]">
    {userData?.avatar?.secure_url && !imageError ? (
      <img
        src={userData.avatar.secure_url}
        alt="Profile"
        onError={() => setImageError(true)}
        className="w-40 h-40 mx-auto rounded-full border border-black object-cover"
      />
    ) : (
      <FaUserCircle className="w-40 h-40 text-zinc-400 mx-auto" />
    )}

    <h2 className="text-center text-xl font-semibold mb-1">
      {userData?.fullName || "Unknown User"}
    </h2>
    <p className="text-center text-zinc-300 mb-1">
      {userData?.email || "No email available"}
    </p>
    <p className="text-center text-zinc-300 mb-2">
      Status: {userData?.subscription?.status === "active" ? "Active" : "Inactive"}
    </p>

    <div className="flex items-center justify-between gap-2">
      <Link 
        to="/user/change-password" 
        className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-200 rounded-sm font-semibold text-center py-2"
      >
        Change Password
      </Link>
      <Link 
        to="/user/editprofile" 
        className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-200 rounded-sm font-semibold text-center py-2"
      >
        Edit Profile
      </Link>
    </div>

    {userData?.subscription?.status === "active" && (
      <button onClick={handleCancellation} className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-200 rounded-sm font-semibold py-2 mt-4">
        Cancel Subscription
      </button>
    )}
  </div>
</div>

    </HomeLayout>
  );
}

export default Profile;
