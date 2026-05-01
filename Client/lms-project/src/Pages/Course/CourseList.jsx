import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import CourseCard from "../../Components/CourseCard";
function CourseList(){
const dispatch=useDispatch();
const { courseData, loading, error } = useSelector((state) => state.course);
async function loadCourses(){
    await dispatch(getAllCourses());
}
useEffect(()=>{
loadCourses();
},[]);



 return (
    <HomeLayout>
      <div className="min-h-[90vh] bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white py-16 px-6 md:px-12 lg:px-20 transition-all duration-700">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-200 to-orange-400 drop-shadow-lg">
            Explore Courses by Industry Experts
          </h1>
          <p className="text-white-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Learn from the best minds — enhance your skills with structured, professional, and engaging courses.
          </p>
        </div>

        {/* Loading & Error State */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh] text-2xl font-semibold text-yellow-300 animate-pulse">
            Loading courses...
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[50vh] text-xl text-red-200 font-semibold">
            Error: {error}
          </div>
        ) : (
          <>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
              {courseData?.length > 0 ? (
                courseData.map((course) => (
                  <div
                    key={course._id}
                    className="transform transition-all duration-500
hover:scale-105 focus:scale-105 active:scale-105 "
                  >
                    <CourseCard data={course} />
                  </div>
                ))
              ) : (
                <p className="text-center text-white-300 text-lg col-span-full">
                  No courses available yet.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </HomeLayout>
  );
}
export default CourseList;