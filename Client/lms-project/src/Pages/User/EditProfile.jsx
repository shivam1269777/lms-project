import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);
  const userId = userData?._id;

  const [data, setData] = useState({
    previewImage: userData?.avatar?.secure_url || "",
    fullName: userData?.fullName || "",
    avatar: undefined,
  });

  function handleImageUpload(e) {
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    // check if no changes
    if (!data.avatar && data.fullName === userData.fullName) {
      toast.error("No changes detected");
      return;
    }

    // check for valid name if changed
    if (data.fullName && data.fullName.length < 3) {
      toast.error("Name must be at least 3 characters long");
      return;
    }

    const formData = new FormData();
    if (data.fullName) formData.append("fullName", data.fullName);
    if (data.avatar) formData.append("avatar", data.avatar);

    try {
      await dispatch(updateProfile([userId, formData]));
      await dispatch(getUserData());
      toast.success("Profile updated successfully!");
      navigate("/user/profile");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[90vh] px-4">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-6 rounded-2xl p-8 text-white w-full max-w-md shadow-[0_0_10px_black] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 backdrop-blur-md border border-zinc-700"
        >
          <h1 className="text-center text-3xl font-bold text-yellow-500 mb-2">
            Edit Profile
          </h1>

          {/* Profile Image Upload */}
          <div className="flex flex-col items-center">
            <label htmlFor="image_uploads" className="cursor-pointer group">
              {data.previewImage ? (
                <img
                  src={data.previewImage}
                  alt="Profile Preview"
                  className="w-40 h-40 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <BsPersonCircle className="w-28 h-28 text-yellow-500 transition-transform duration-300 group-hover:scale-110" />
              )}
            </label>
            <input
              onChange={handleImageUpload}
              className="hidden"
              type="file"
              id="image_uploads"
              accept="image/*"
            />
            <p className="text-sm text-zinc-400 mt-2">
              Click the image to change your avatar
            </p>
          </div>

          {/* Full Name Input */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="fullName"
              className="text-lg font-semibold text-yellow-400"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your full name"
              className="bg-zinc-800/70 border border-zinc-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-zinc-500"
              value={data.fullName}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-md py-2 text-lg font-semibold shadow-md hover:shadow-yellow-600/30"
          >
            Update Profile
          </button>

          {/* Back Link */}
          <Link
            to="/user/profile"
            className="flex items-center justify-center gap-2 text-yellow-400 hover:text-yellow-300 transition"
          >
            <AiOutlineArrowLeft /> Go back to profile
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}

export default EditProfile;
