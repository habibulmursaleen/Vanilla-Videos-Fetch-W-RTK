const { fetchVideos } = require("../rtk/features/video/videoSlice");
const {
  fetchRelatedVideos,
} = require("../rtk/features/relatedVideos/relatedVideosSlice");

const fetchVideosAndRelatedVideos = () => async (dispatch, getState) => {
  try {
    await dispatch(fetchVideos());
    const tags = getState().video.video.tags;
    await dispatch(fetchRelatedVideos(tags));
  } catch (error) {
    console.error(error);
  }
};

module.exports.fetchVideosAndRelatedVideos = fetchVideosAndRelatedVideos;
