const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// fetchVideos
const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
  const response = await fetch("http://localhost:9000/videos");
  const videos = await response.json();
  return videos;
});

// fetchRelatedVideos
const fetchRelatedVideos = createAsyncThunk(
  "videos/fetchRelatedVideos",
  async (tags) => {
    const queryParams = tags?.map((tag) => `tags_like=${tag}`).join("&");
    const response = await fetch(`http://localhost:9000/videos?${queryParams}`);
    const relatedVideos = await response.json();
    const sortedVideos = relatedVideos.sort(
      (a, b) => parseFloat(b.views) - parseFloat(a.views)
    );

    return sortedVideos;
  }
);

const videosSlice = createSlice({
  name: "video",
  initialState: {
    video: [],
    relatedVideos: [], // add empty array for related videos
    status: "idle",
    error: null,
  },
  reducers: {},
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
      })
      .addCase(fetchRelatedVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRelatedVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.relatedVideos = action.payload;
      })
      .addCase(fetchRelatedVideos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

module.exports = videosSlice.reducer;
module.exports = videosSlice.actions;
module.exports.fetchVideos = fetchVideos;
module.exports.fetchRelatedVideos = fetchRelatedVideos;
