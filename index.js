const store = require("./rtk/app/store");
const { fetchVideosAndRelatedVideos } = require("./thunk/fetchVideosThunk");

// subscribe to state changes
store.subscribe(() => {
  // console.log(store.getState());
});

// disptach actions
store.dispatch(fetchVideosAndRelatedVideos());
