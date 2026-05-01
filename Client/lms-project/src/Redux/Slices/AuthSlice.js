import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstance from "../../Helpers/axiosintance";
import { toast } from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  role: localStorage.getItem('role') || "",
  data: (() => {
    try {
      return JSON.parse(localStorage.getItem('data')) || {};
    } catch {
      return {};
    }
  })()
};

export const createAccount = createAsyncThunk(
  "/auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.post("user/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message); // ✅ Success toast
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Something went wrong!";
      toast.error(message);
      return rejectWithValue({ success: false, message });
    }
  }
);

export const login = createAsyncThunk(
  "/auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.post("/user/login", data);
      toast.success(response.data.message); // ✅ Success toast
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Something went wrong!";
      toast.error(message);
      return rejectWithValue({ success: false, message });
    }
  }
);

export const logout = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get("user/logout");
      toast.success(response.data.message); // ✅
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Something went wrong!";
      toast.error(message);
      return rejectWithValue({ success: false, message });
    }
  }
);

export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async (data) => {
    try {
      const res = axiosinstance.put(`user/update/${data[0]}`, data[1]); // ✅ toast.promise ke liye await nahi
      toast.promise(res, {
        loading: "Wait! profile update in progress...",
        success: (data) => data?.data?.message,
        error: "Failed to update profile"
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const getUserData = createAsyncThunk(
  "user/details",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get("user/me");
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Something went wrong!";
      toast.error(message);
      return rejectWithValue({ success: false, message });
    }
  }
);

export const changePassword = createAsyncThunk(
  "/user/change-password",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosinstance.post(`user/change-password`, data);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Something went wrong!";
      toast.error(message);
      return rejectWithValue({ success: false, message });
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "/user/forgot-password",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosinstance.post("/user/forgot-password", data);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Something went wrong!";
      toast.error(message);
      return rejectWithValue({ success: false, message });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ resetToken, password }, { rejectWithValue }) => {
    try {
      const res = await axiosinstance.post(`/user/reset-password/${resetToken}`, { password });
      toast.success(res.data.message); // ✅
      return res.data;
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong!";
      return rejectWithValue({ success: false, message });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ✅ Register
    builder.addCase(createAccount.fulfilled, (state, action) => {
      if (!action?.payload?.user) return;
      localStorage.setItem("data", JSON.stringify(action?.payload?.user));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem('role', action?.payload?.user?.role);
      state.isLoggedIn = true;
      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.role;
    })

    // ✅ Login
    .addCase(login.fulfilled, (state, action) => {
      if (!action?.payload?.user) return;
      localStorage.setItem("data", JSON.stringify(action?.payload?.user));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem('role', action?.payload?.user?.role);
      state.isLoggedIn = true;
      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.role;
    })

    // ✅ Logout
    .addCase(logout.fulfilled, (state) => {
      localStorage.clear();
      state.data = {};
      state.isLoggedIn = false;
      state.role = "";
    })

    // ✅ Get User Data
    .addCase(getUserData.fulfilled, (state, action) => {
      if (!action?.payload?.user) return;
      localStorage.setItem("data", JSON.stringify(action?.payload?.user));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem('role', action?.payload?.user?.role);
      state.isLoggedIn = true;
      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.role;
    })
  }
});

export const { } = authSlice.actions;
export default authSlice.reducer;