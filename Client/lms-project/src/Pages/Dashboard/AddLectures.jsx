import { useLocation, useNavigate } from "react-router";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import toast from "react-hot-toast";

function AddLectures() {
  const courseDetails = useLocation().state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    id: courseDetails?._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  }

  function handleVideoUpload(e) {
    const video = e.target.files[0];
    if (video) {
      const source = window.URL.createObjectURL(video);
      console.log(source)
      setUserInput({ ...userInput, lecture: video, videoSrc: source });
    }
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast.error("All fields are mandatory");
      return;
    }

    const response = await dispatch(addCourseLecture(userInput));
    if (response?.payload?.success) {
      toast.success("Lecture added successfully");
      setUserInput({
        id: courseDetails._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
       navigate("/courses");
    }
  }

  useEffect(() => {
    if (!courseDetails) {
      navigate("/courses");
    }
  }, [courseDetails, navigate]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
        <div className="flex flex-col gap-5 p-4 shadow-[0_0_10px_black] w-96 rounded-lg bg-[#111827]">
          <header className="flex items-center justify-center relative mb-4">
            <button
              className="absolute left-2 text-xl text-green-500 hover:text-green-400"
              onClick={() => navigate(-1)}
            >
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-xl text-yellow-500 font-semibold">
              Add New Lecture
            </h1>
          </header>

          <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              placeholder="Enter the title of the lecture"
              onChange={handleInputChange}
              className="bg-gray-800 px-3 py-2 border border-gray-600 rounded text-white focus:outline-none focus:border-yellow-500"
              value={userInput.title}
            />

            <textarea
              name="description"
              placeholder="Enter the description of the lecture"
              onChange={handleInputChange}
              className="bg-gray-800 px-3 py-2 border border-gray-600 rounded text-white resize-none h-36 focus:outline-none focus:border-yellow-500"
              value={userInput.description}
            />

            {userInput.videoSrc ? (
              <video
                muted
                src={userInput.videoSrc}
                controls
                controlsList="nodownload nofullscreen"
                disablePictureInPicture
                className="object-fill rounded-lg w-full mt-2"
              />
            ) : (
              <div className="h-40 border border-gray-600 flex items-center justify-center cursor-pointer rounded">
                <label
                  htmlFor="lecture"
                  className="font-semibold text-lg text-gray-300 cursor-pointer hover:text-yellow-400"
                >
                  Choose your video
                </label>
                <input
                  type="file"
                  id="lecture"
                  name="lecture"
                  className="hidden"
                  onChange={handleVideoUpload}
                  accept="video/mp4, video/x-mp4, video/*"
                />
              </div>
            )}

            <button
              type="submit"
              className="px-4 py-2 mt-2 bg-purple-600 text-white font-bold rounded-lg shadow-md hover:bg-purple-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Add New Lecture
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AddLectures;
