import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router";
import HompageImage from "../assets/homePageMainImage.png"
function HomePage(){
return(
    <HomeLayout>
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10 px-6 sm:px-10 md:px-16 lg:px-24 py-10 text-white min-h-[90vh]">
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-snug">
Find out best
<span className="text-yellow-500 font-bold">Online Courses</span>
            </h1>
<p className="text-base sm:text-lg md:text-xl text-gray-300">
    We have a large library of courses taught by highly Skilled and qualified faculties at a very affordable Cost
</p>
<div className="flex flex-col sm:flex-row items-center md:items-start gap-4 sm:gap-6">
    <Link to="/courses">
    <button className="bg-yellow-500 px-6 py-3 rounded-md font-semibold text-lg hover:bg-yellow-600 transition-all duration-300 w-full sm:w-auto">Explore Courses</button>
    </Link>
     <Link to="/contact">
    <button className="border border-yellow-500 px-6 py-3 rounded-md font-semibold text-lg hover:bg-yellow-600 transition-all duration-300 w-full sm:w-auto ">Contact Us</button>
    </Link>
   
</div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center">
            <img alt="homepage image" src={HompageImage}  className="w-3/4 sm:w-2/3 md:w-full max-w-md drop-shadow-2xl"/>
            </div>

        </div>
    </HomeLayout>)
}

export default HomePage;