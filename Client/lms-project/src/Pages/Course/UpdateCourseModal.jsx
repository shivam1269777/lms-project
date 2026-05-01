import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCourse } from "../../Redux/Slices/CourseSlice";
import { useNavigate } from "react-router";

function UpdateCourseModal({ course, onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [category, setCategory] = useState(course.category);
  const [loading, setLoading] = useState(false);
const navigate=useNavigate();
  const handleUpdate = async () => {
    try {
      setLoading(true);
      await dispatch(updateCourse({ id: course._id, title, description, category })).unwrap();
      onClose();
      navigate("/admin/dashboard")
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md text-white shadow-2xl transform transition-all duration-300 animate-fadeIn">
        
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-yellow-400 text-center tracking-wide">
          Update Course
        </h2>

        {/* Input Fields */}
        <div className="flex flex-col gap-4">
          <label className="font-semibold text-yellow-400" htmlFor="title">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            placeholder="Enter course title"
            name="title"
          />

          <label className="font-semibold text-yellow-400" htmlFor="description">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition resize-none h-28"
            placeholder="Enter course description"
            name="description"
          />

          <label className="font-semibold text-yellow-400" htmlFor="category">Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            placeholder="Enter course category"
            name="category"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              loading
                ? "bg-yellow-500 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-300"
            }`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateCourseModal;
