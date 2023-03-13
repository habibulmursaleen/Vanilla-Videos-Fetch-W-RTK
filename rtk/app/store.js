const configureStore = require("@reduxjs/toolkit").configureStore;
const videoReducer = require("../features/video/videoSlice");
const relatedVideosReducer = require("../features/relatedVideos/relatedVideosSlice");
const { createLogger } = require("redux-logger");

const logger = createLogger();

// configure store
const store = configureStore({
  reducer: {
    video: videoReducer,
    relatedVideos: relatedVideosReducer,
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(logger),
});

module.exports = store;
