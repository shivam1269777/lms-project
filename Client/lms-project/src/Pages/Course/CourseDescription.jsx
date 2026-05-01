import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import HomeLayout from "../../Layouts/HomeLayout";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

function CourseDescription() {
  const { state } = useLocation();
  const { role, data } = useSelector((state) => state.auth);
  const { courseData } = useSelector((store) => store.course);
  const navigate = useNavigate();

  const courseId = state?._id;
  const courseDetails =
    courseData.find((c) => c._id === courseId) || state || {};

  if (!courseDetails?._id) {
    toast.error("Course details not found. Redirecting...");
    navigate("/courses");
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-16 px-6 md:px-20 flex flex-col items-center text-white bg-[#0f1626]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 w-full max-w-6xl">

          {/* Left Section */}
          <div className="space-y-6 flex flex-col items-center">
            <img
              className="w-full h-64 object-cover rounded-xl shadow-lg border border-gray-700 hover:scale-[1.02] transition-transform duration-300"
              alt="thumbnail"
              src={
                courseDetails?.thumbnail?.secure_url ||
                "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800"
              }
            />
            <div className="space-y-4 text-center md:text-left">
              <p className="text-lg font-semibold">
                <span className="text-yellow-400 font-bold">Total Lectures: </span>
                {courseDetails?.numberofLecture || 0}
              </p>
              <p className="text-lg font-semibold">
                <span className="text-yellow-400 font-bold">Instructor: </span>
                {courseDetails?.createdBy || "N/A"}
              </p>

              <div className="flex flex-col md:flex-row gap-3 mt-2 w-full">
                {role?.toUpperCase() === "ADMIN" || data?.subscription?.status === "active" ? (
                  <button
                    onClick={() =>
                      navigate("/course/displaylectures", { state: { ...courseDetails } })
                    }
                    className="w-full md:w-auto bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-all duration-300 shadow-md hover:shadow-yellow-400/30"
                  >
                    Watch Lectures
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full md:w-auto border-2 border-yellow-500 text-yellow-400 font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 shadow-md hover:shadow-yellow-400/30"
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-yellow-400">
              {courseDetails?.title || "Course Title"}
            </h1>
            <p className="text-gray-300 text-base leading-relaxed">
              {courseDetails?.description || "No course description available."}
            </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;
