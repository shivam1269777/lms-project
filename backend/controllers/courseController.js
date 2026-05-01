import Course from "../models/courseModel.js"
import AppError from "../utils/errorUtils.js";
import cloudinary from "cloudinary"
import fs from "fs/promises"
const getAllCourses=async function(req,res,next){
    try{const courses=await Course.find({}).select("-lectures");
res.status(200).json({
    success:true,
    message:"All courses",
    courses,
})}catch(e){
return next(new AppError(e.message,500));
}
}

const getLectureByCourseId=async function(req,res,next){
try{
    const {id}=req.params;
    const course=await Course.findById(id);

    if(!course){
        return next(new AppError("Course not found",400))
    }

    res.status(200).json({
        success:true,
        message:"Course lecture fetched successfully",
        lecture:course.lectures
    })
}catch(e){
    return next(new AppError(e.message,500))
}
}

const createCourse=async(req,res,next)=>{
const {title,description,category,createdBy}=req.body;

if(!title||!description||!category||!createdBy){
    return next(new AppError("All fields are required",400))
}

const course=await Course.create({
    title,
    description,
    category,
    createdBy,
    thumbnail:{
        public_id:"Dummy",
        secure_url:"Dummy"
    }
});
if(!course){
    return next(new AppError("Course couldn't created,please try again",500))
}

if(req.file){
    const result=await cloudinary.v2.uploader.upload(req.file.path,{
        folder:'lms'
    });
    if(result){
        course.thumbnail.public_id=result.public_id;
         course.thumbnail.secure_url=result.secure_url;
    }
await fs.rm(`uploads/${req.file.filename}`);
}
await course.save();
res.status(200).json({
    success:true,
    message:"Course created successfully",
    course,

});

}

const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("Course with given id does not exist", 404));
    }

    // Update fields from req.body
    const { title, description, category } = req.body;

    if (title !== undefined) course.title = title;
    if (description !== undefined) course.description = description;
    if (category !== undefined) course.category = category;

    // no thumbnail handling

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};


 const removeLectureFromCourse = async (req, res, next) => {
  // Grabbing the courseId and lectureId from req.query
  const { courseId, lectureId } = req.query;

  console.log(courseId);

  // Checking if both courseId and lectureId are present
  if (!courseId) {
    return next(new AppError('Course ID is required', 400));
  }

  if (!lectureId) {
    return next(new AppError('Lecture ID is required', 400));
  }

  // Find the course uding the courseId
  const course = await Course.findById(courseId);

  // If no course send custom message
  if (!course) {
    return next(new AppError('Invalid ID or Course does not exist.', 404));
  }

  // Find the index of the lecture using the lectureId
  const lectureIndex = course.lectures.findIndex(
    (lecture) => lecture._id.toString() === lectureId.toString()
  );

  // If returned index is -1 then send error as mentioned below
  if (lectureIndex === -1) {
    return next(new AppError('Lecture does not exist.', 404));
  }

  // Delete the lecture from cloudinary
  await cloudinary.v2.uploader.destroy(
    course.lectures[lectureIndex].lecture.public_id,
    {
      resource_type: 'video',
    }
  );

  // Remove the lecture from the array
  course.lectures.splice(lectureIndex, 1);

  // update the number of lectures based on lectres array length
  course.numberofLecture = course.lectures.length;

  // Save the course object
  await course.save();

  // Return response
  res.status(200).json({
    success: true,
    message: 'Course lecture removed successfully',
  });
};


const addLectureToCourseById=async(req,res,next)=>{
const {title,description}=req.body;
const {id}=req.params;
if(!title||!description){
    return next(new AppError("All fields are required",400))
}

const course=await Course.findById(id);
if(!course){
    return next(new AppError("Course couldn't created,please try again",500))
}
const lectureData={title,description,lecture:{}};
if(req.file){
 const result=await cloudinary.v2.uploader.upload(req.file.path,{
        folder:'lms',
         resource_type: "video",
    });
    if(result){
        lectureData.lecture.public_id=result.public_id;
         lectureData.lecture.secure_url=result.secure_url;
    }
await fs.rm(`uploads/${req.file.filename}`);
}

course.lectures.push(lectureData);
 course.numberofLecture=course.lectures.length;
 await course.save();
 res.status(200).json({
    success:true,
    message:"Lecture is successfully added to the course",
    course
 })
}

export{
    getAllCourses,
    getLectureByCourseId,
    createCourse,
    updateCourse,
    removeLectureFromCourse,
    addLectureToCourseById
}