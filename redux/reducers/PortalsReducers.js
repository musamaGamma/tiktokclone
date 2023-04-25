import {
  GET_PORTALS_FAIL,
  GET_PORTALS_REQUEST,
  GET_PORTALS_SUCCESS,
  GET_PORTAL_STATS_FAIL,
  GET_PORTAL_STATS_REQUEST,
  GET_PORTAL_STATS_SUCCESS,
} from "../types";

export const PortalsReducer = (state = { portals: [] }, action) => {
  switch (action.type) {
    // When the login request starts
    case GET_PORTALS_REQUEST:
      return { ...state, loading: true };

    // When the login request succeeds
    case GET_PORTALS_SUCCESS:
      return {
        ...state,
        loading: false,
        portals: action.payload,
      };

    // When the login request fails
    case GET_PORTALS_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Default case
    default:
      return state;
  }
};
export const PortalStats = (state = { stats: {} }, action) => {
  switch (action.type) {
    // When the login request starts
    case GET_PORTAL_STATS_REQUEST:
      return { ...state, loading: true };

    // When the login request succeeds
    case GET_PORTAL_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        stats: action.payload,
      };

    // When the login request fails
    case GET_PORTAL_STATS_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Default case
    default:
      return state;
  }
};
