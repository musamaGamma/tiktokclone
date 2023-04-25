const videos = [
  {
    url: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    id: 1,
  },
  {
    url: "https://assets.mixkit.co/videos/preview/mixkit-two-cats-eating-1547-large.mp4",
    id: 2,
  },

  {
    url: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-makes-a-bowling-shot-49113-large.mp4",
    id: 3,
  },
];
export const videosReducer = (state = videos, action) => {
  switch (action.type) {
    case "ADD_VIDEO":
      return [...state, action.payload];
    default:
      return state;
  }
};
