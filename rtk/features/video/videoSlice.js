const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// initial state
const initialState = {
  status: "idle",
  video: [],
  error: "",
};

// fetchVideos
const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
  const response = await fetch("http://localhost:9000/videos");
  const videos = await response.json();
  return videos;
});

const videosSlice = createSlice({
  name: "video",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.video = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

module.exports = videosSlice.reducer;
module.exports.fetchVideos = fetchVideos;
