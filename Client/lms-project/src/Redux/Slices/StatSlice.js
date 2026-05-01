import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstance from "../../Helpers/axiosintance";
import { toast } from "react-hot-toast";

const initialState = {
  allUsersCount: 0,
  subscribedCount: 0,
  loading: false,
};

export const getStatsData = createAsyncThunk(
  "stats/get",
  async (_, { rejectWithValue }) => {
    try {
      const responsePromise = axiosinstance.get("/admin/stats/users");

      toast.promise(responsePromise, {
        loading: "Getting the stats...",
        success: (data) => data?.data?.message || "Stats loaded successfully",
        error: "Failed to load data",
      });

      const response = await responsePromise;
      return response.data; // expects { allUsersCount, subscribedUsersCount }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(error?.response?.data);
    }
  }
);

const statSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatsData.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsersCount = action.payload?.allUsersCount || 0;
        state.subscribedCount = action.payload?.subscribedUsersCount || 0;
      })
      .addCase(getStatsData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default statSlice.reducer;
