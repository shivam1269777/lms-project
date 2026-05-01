import { useNavigate } from "react-router";

function CourseCard({ data }) {
  const navigate = useNavigate();

   return (
    <div
      onClick={() => navigate(`/course/description/${data._id}`,{state:{...data}})}
      className="w-full max-w-sm h-[430px] bg-zinc-800/80 
             rounded-2xl overflow-hidden cursor-pointer group 
             shadow-lg hover:shadow-yellow-500/40 active:shadow-yellow-500/40 
             transform hover:scale-105 active:scale-105 
             transition-all duration-500 border border-zinc-700 hover:border-yellow-400 active:border-yellow-400"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          className="w-full h-full object-cover transform group-hover:scale-110 
                     transition-all duration-500 ease-in-out"
          src={data?.thumbnail?.secure_url || "/images/default-course.jpg"}
          alt="course thumbnail"
        />

        {/* Subtle gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between h-[calc(100%-12rem)] text-gray-100">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-yellow-400 
               group-hover:text-yellow-300 group-active:text-yellow-300 
               transition-colors duration-300">
            {data?.title}
          </h2>

          <p className="text-sm text-gray-300 line-clamp-2">{data?.description}</p>

          <p className="text-sm font-medium">
            <span className="text-yellow-400 font-semibold">Category: </span>
            {data?.category || "N/A"}
          </p>

          <p className="text-sm font-medium">
            <span className="text-yellow-400 font-semibold">Total Lectures: </span>
            {data?.numberofLecture || 0}
          </p>

          <p className="text-sm font-medium">
            <span className="text-yellow-400 font-semibold">Instructor: </span>
            {data?.createdBy || "Unknown"}
          </p>
        </div>

        {/* Hover effect line */}
        <div className="mt-3 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
      </div>
    </div>
  );
}

export default CourseCard;
