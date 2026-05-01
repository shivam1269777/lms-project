import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import HomeLayout from "../../Layouts/HomeLayout";
import { Bar, Pie } from "react-chartjs-2";
import { toast } from "react-hot-toast";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { FaUsers, FaUserCheck, FaClipboardList, FaDollarSign } from "react-icons/fa";

import { getAllCourses, deleteCourses } from "../../Redux/Slices/CourseSlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import UpdateCourseModal from "../Course/UpdateCourseModal";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);
  const { monthlySalesRecord, allPayments } = useSelector((state) => state.razorpay);
  const { courseData } = useSelector((state) => state.course);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch data
  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, [dispatch]);

  // Chart Data
  const userData = {
    labels: ["Registered Users", "Subscribed Users"],
    datasets: [
      {
        data: [allUsersCount || 0, subscribedCount || 0],
        backgroundColor: ["#FACC15", "#22C55E"],
        borderColor: ["#FACC15", "#22C55E"],
        borderWidth: 1,
      },
    ],
  };

  const salesData = {
    labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord || [],
        backgroundColor: "#3B82F6",
        borderWidth: 2,
      },
    ],
  };

  // Stats Cards
  const subscriptionCount = allPayments?.count || 0; // users attempted payment
  const totalRevenue = subscribedCount * 499; // total courses * 499

  const stats = [
    { title: "Registered Users", value: allUsersCount, icon: <FaUsers size={24} className="text-yellow-400" /> },
    { title: "Subscribed Users", value: subscribedCount, icon: <FaUserCheck size={24} className="text-green-500" /> },
    { title: "Subscription Count", value: subscriptionCount, icon: <FaClipboardList size={24} className="text-blue-400" /> },
    { title: "Total Revenue", value: totalRevenue, icon: <FaDollarSign size={24} className="text-purple-400" /> },
  ];

  // Delete Course
  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const res = await dispatch(deleteCourses(id));
      if (!res?.error) {
        toast.success("Course deleted successfully!");
        await dispatch(getAllCourses());
      } else {
        toast.error("Failed to delete course!");
      }
    }
  }

  // Edit Course
  function onEditCourse(course) {
    setSelectedCourse(course);
    setIsModalOpen(true);
  }

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-yellow-400">
          Admin Dashboard
        </h1>

        {/* === Stats Cards === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-gray-800 flex items-center p-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="mr-4">{stat.icon}</div>
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-white font-bold text-xl">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* === Charts === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg">
            <h2 className="text-lg sm:text-xl mb-4 text-center font-semibold text-yellow-400">
              User Overview
            </h2>
            <div className="max-w-xs mx-auto">
              <Pie data={userData} />
            </div>
          </div>

          <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg">
            <h2 className="text-lg sm:text-xl mb-4 text-center font-semibold text-yellow-400">
              Monthly Sales Record
            </h2>
            <div className="overflow-x-auto">
              <Bar data={salesData} />
            </div>
          </div>
        </div>

        {/* === Courses Table === */}
        <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400">
              Manage Courses
            </h2>
            <button
              onClick={() => navigate("/course/create")}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 font-semibold w-full sm:w-auto"
            >
              + Add Course
            </button>
          </div>

          {courseData && courseData.length > 0 ? (
            <table className="min-w-full text-sm sm:text-base text-left border border-gray-700 rounded-lg overflow-x-auto">
              <thead className="bg-gray-700 text-yellow-400">
                <tr>
                  <th className="px-2 sm:px-4 py-2 border-b border-gray-600">#</th>
                  <th className="px-2 sm:px-4 py-2 border-b border-gray-600">Thumbnail</th>
                  <th className="px-2 sm:px-4 py-2 border-b border-gray-600">Title</th>
                  <th className="px-2 sm:px-4 py-2 border-b border-gray-600">Category</th>
                  <th className="px-2 sm:px-4 py-2 border-b border-gray-600 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courseData.map((course, index) => (
                  <tr key={course._id} className="hover:bg-gray-700">
                    <td className="px-2 sm:px-4 py-2 border-b border-gray-700">{index + 1}</td>
                    <td className="px-2 sm:px-4 py-2 border-b border-gray-700">
                      <img
                        src={course.thumbnail?.secure_url || "https://via.placeholder.com/100"}
                        alt={course.title}
                        className="h-10 sm:h-14 w-16 sm:w-20 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-2 sm:px-4 py-2 border-b border-gray-700">{course.title}</td>
                    <td className="px-2 sm:px-4 py-2 border-b border-gray-700">{course.category}</td>
                    <td className="px-2 sm:px-4 py-2 border-b border-gray-700 text-center">
                      <div className="flex justify-center gap-2 flex-wrap">
                        <button
                          onClick={() => onEditCourse(course)}
                          className="bg-blue-600 px-2 py-1 rounded-md text-xs sm:text-sm hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onCourseDelete(course._id)}
                          className="bg-red-600 px-2 py-1 rounded-md text-xs sm:text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-400 mt-4">No courses available.</p>
          )}
        </div>

        {/* Update Modal */}
        {isModalOpen && selectedCourse && (
          <UpdateCourseModal
            course={selectedCourse}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedCourse(null);
            }}
          />
        )}
      </div>
    </HomeLayout>
  );
}

export default AdminDashboard;
