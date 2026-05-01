import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance from "../../Helpers/axiosintance";
import { toast } from "react-hot-toast"; 

const initialState={
    courseData:[],
    loading: false,
  error: null,
}

export const getAllCourses= createAsyncThunk(
  "/course/get",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get("/courses", data); // ✅ leading slash
      return response.data.courses;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(message);
      return rejectWithValue({  message });
    }
  }
);

export const createNewCourse=createAsyncThunk(
  "/course/create",
  async (data, { rejectWithValue }) => {
    try {
     let formData=new FormData();
     formData.append("title",data?.title);
      formData.append("description",data?.description);
       formData.append("category",data?.category);
       formData.append("createdBy",data?.createdBy);
        formData.append("thumbnail",data?.thumbnail);
        const response=axiosinstance.post("/courses",formData)
toast.promise(response,{
  loading:"Creating new course",
  success:"Course created successfully",
  error:"Failed to create course"
});
return (await response).data
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(message);
      return rejectWithValue({  message });
    }
  }
);

export const updateCourse = createAsyncThunk(
  "courses/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.put(`/courses/${data.id}`, {
        title: data.title,
        description: data.description,
        category: data.category,
      });
      toast.success("Course updated successfully!");
      return response.data; // { success, message, course }
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Something went wrong!";
      toast.error(message);
      return rejectWithValue({ message });
    }
  }
);


export const deleteCourses = createAsyncThunk(
  "/course/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.delete(`/courses/${id}`);
      
      toast.success(response?.data?.message || "Course deleted successfully!");
      
      // Return the deleted course ID or response data
      return id;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(message);
      return rejectWithValue({ message });
    }
  }
);


const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllCourses
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.courseData = [...action.payload];
        }
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateCourse
     .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCourse = action.payload.course;
        const index = state.courseData.findIndex(c => c._id === updatedCourse._id);
        if (index !== -1) state.courseData[index] = updatedCourse;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;



