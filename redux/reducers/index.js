import { combineReducers } from "redux";

import { videosReducer } from "./VideosReducers";

export default combineReducers({
  Videos: videosReducer,
});
