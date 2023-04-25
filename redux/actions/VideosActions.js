import { ADD_VIDEO } from "../types";

export const addVideo = (video) => (dispatch, getState) => {
  const { Videos: videos } = getState();
  dispatch({
    type: ADD_VIDEO,
    payload: { url: video, id: videos.at(-1).id + 1 },
  });
};
