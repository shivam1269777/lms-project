import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router";
function CreateCourse(){
   const dispatch=useDispatch();
   const navigate=useNavigate();

   const [userInput,setUserInput]=useState({
title:"",
category:"",
createdBy:"",
description:"",
thumbnail:null,
previewImage:""
   });

const handleImageUpload=(e)=>{
   e.preventDefault();
   const uploadImage=e.target.files[0];
if(uploadImage){
   const fileReader=new FileReader();
   fileReader.readAsDataURL(uploadImage);
   fileReader.addEventListener("load",function(){
      setUserInput({
         ...userInput,
         previewImage:this.result,
         thumbnail:uploadImage
      })
   })
}
}
function handleUserInput(e){
const {name,value}=e.target;
setUserInput({
   ...userInput,
   [name]:value
})
}

async function onFormSubmit(e){
   e.preventDefault();
   if(!userInput.title||!userInput.description||!userInput.category||!userInput.thumbnail||!userInput.createdBy){
      toast.error("All fields are mandatory");
      return;
   }

   const response=await dispatch(createNewCourse(userInput))
   if(response?.payload?.success){
     setUserInput( {
title:"",
category:"",
createdBy:"",
description:"",
thumbnail:null,
previewImage:""
   })
   navigate("/courses") }
  
}
   return (
    <HomeLayout>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 px-4 py-10">
        <form
          onSubmit={onFormSubmit}
          className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-700 rounded-2xl p-8 shadow-lg text-white"
        >
          {/* Back Button */}
          <Link
            to="/courses"
            className="absolute top-6 left-6 text-2xl text-yellow-500 hover:text-yellow-400 transition-all"
          >
            <AiOutlineArrowLeft />
          </Link>

          {/* Heading */}
          <h1 className="text-center text-3xl font-bold mb-8">
            Create New Course
          </h1>

          {/* Form Grid */}
          <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Image + Title */}
            <div className="flex flex-col gap-6">
              {/* Thumbnail Upload */}
              <div>
                <label
                  htmlFor="image_uploads"
                  className="cursor-pointer block w-full"
                >
                  {userInput.previewImage ? (
                    <img
                      src={userInput.previewImage}
                      alt="Thumbnail Preview"
                      className="w-full h-52 object-cover rounded-lg border border-zinc-600 shadow-md hover:shadow-xl transition-all"
                    />
                  ) : (
                    <div className="w-full h-52 flex items-center justify-center border-2 border-dashed border-zinc-600 rounded-lg hover:border-yellow-500 transition-all">
                      <h1 className="font-semibold text-zinc-400 text-center">
                        Upload Course Thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="image_uploads"
                  accept=".jpg,.jpeg,.png,.svg"
                  name="image_uploads"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Course Title */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="title"
                  className="text-lg font-semibold text-zinc-300"
                >
                  Course Title
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter course title"
                  value={userInput.title}
                  onChange={handleUserInput}
                  className="bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="flex flex-col gap-5">
              {/* Instructor */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="createdBy"
                  className="text-lg font-semibold text-zinc-300"
                >
                  Course Instructor
                </label>
                <input
                  required
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter course instructor"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                  className="bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 focus:outline-none focus:border-yellow-500"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="category"
                  className="text-lg font-semibold text-zinc-300"
                >
                  Course Category
                </label>
                <input
                  required
                  type="text"
                  name="category"
                  id="category"
                  placeholder="e.g., Web Development"
                  value={userInput.category}
                  onChange={handleUserInput}
                  className="bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 focus:outline-none focus:border-yellow-500"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="description"
                  className="text-lg font-semibold text-zinc-300"
                >
                  Course Description
                </label>
                <textarea
                  required
                  name="description"
                  id="description"
                  placeholder="Write a short description about the course..."
                  value={userInput.description}
                  onChange={handleUserInput}
                  className="bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 h-28 resize-none focus:outline-none focus:border-yellow-500"
                ></textarea>
              </div>
            </div>
          </main>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold bg-yellow-600 hover:bg-yellow-500 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </HomeLayout>
  );}
export default CreateCourse;