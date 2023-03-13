const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// initial state
const initialState = {
  status: false,
  relatedVideos: [],
  error: "",
};

// fetchRelatedVideos
const fetchRelatedVideos = createAsyncThunk(
  "relatedVideos/fetchRelatedVideos",
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

const relatedVideosSlice = createSlice({
  name: "relatedVideos",
  initialState,
  extraReducers: (builder) => {
    builder
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

module.exports = relatedVideosSlice.reducer;
module.exports.fetchRelatedVideos = fetchRelatedVideos;
