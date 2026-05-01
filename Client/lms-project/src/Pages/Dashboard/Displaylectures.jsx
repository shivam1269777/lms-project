import { useNavigate } from "react-router";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { deleteCourseLecture, getCourseLectures } from "../../Redux/Slices/LectureSlice";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

function Displaylectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state;

  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId) {
    console.log(courseId, lectureId);
    await dispatch(deleteCourseLecture({ courseId, lectureId }));
    await dispatch(getCourseLectures(courseId));
  }

  useEffect(() => {
    if (!state) {
      navigate("/courses");
      return;
    }
    if (state?._id) {
      dispatch(getCourseLectures(state._id));
    }
  }, [dispatch, navigate, state]);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white">
        {/* Course title */}
        <div className="text-center text-2xl font-semibold text-yellow-500">
          Course Name: {state?.title || "Unknown Course"}
        </div>

        {lectures && lectures.length > 0 ? (
          // If lectures exist
          <div className="flex justify-center gap-10 w-full flex-wrap">
            {/* Left: Video Player */}
            <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
              <video
                src={lectures[currentVideo]?.lecture?.secure_url}
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
              />
              <div>
                <h1>
                  <span className="text-yellow-500">Title: </span>
                  {lectures[currentVideo]?.title}
                </h1>
                <p>
                  <span className="text-yellow-500">Description: </span>
                  {lectures[currentVideo]?.description}
                </p>
              </div>
            </div>

            {/* Right: Lecture List */}
          
{/* Right: Lecture List */}
<ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4 max-h-[70vh] overflow-y-auto">
  {/* Header: Lectures List & Add Button */}
  <div className="flex items-center justify-between mb-2">
    <p className="font-semibold text-xl text-yellow-500">Lectures List</p>
    {role === "ADMIN" && (
      <button
        onClick={() => navigate("/course/addlecture", { state: { ...state } })}
        className="px-4 py-2 bg-purple-600 text-white font-bold rounded-lg shadow-md hover:bg-purple-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center"
      >
        <AiOutlinePlus className="mr-2 text-xl" /> Add New Lecture
      </button>
    )}
  </div>

  {/* Lecture Items */}
  {lectures.map((lecture, index) => (
    <div
      key={lecture._id}
      className="flex flex-col p-2 rounded-md hover:bg-yellow-500/10 transition-all duration-200"
    >
      {/* Lecture Title */}
      <p
        className="cursor-pointer hover:text-yellow-400 font-medium"
        onClick={() => setCurrentVideo(index)}
      >
        <span>Lecture {index + 1}: </span>
        {lecture?.title}
      </p>

      {/* Delete Button for Admin */}
      {role === "ADMIN" && (
        <button
          onClick={() => onLectureDelete(state?._id, lecture._id)}
          className="mt-1 px-3 py-1 bg-green-400 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 w-fit"
        >
          <AiOutlineDelete className="mr-1 inline" /> Delete lecture
        </button>
      )}
    </div>
  ))}
</ul>

          </div>
        ) : (
          // If no lectures
          <div className="flex flex-col items-center gap-5">
            <p className="text-gray-400 text-lg">No lectures available for this course yet.</p>
            {role === "ADMIN" && (
              <button
                onClick={() => navigate("/course/addlecture", { state: { ...state } })}
                className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-md hover:bg-purple-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center"
              >
                <AiOutlinePlus className="mr-2 text-xl" /> Add First Lecture
              </button>
            )}
          </div>
        )}
      </div>
    </HomeLayout>
  );
}

export default Displaylectures;
