import axios from "axios";
import {
  GET_PORTALS_FAIL,
  GET_PORTALS_REQUEST,
  GET_PORTALS_SUCCESS,
  GET_PORTAL_STATS_FAIL,
  GET_PORTAL_STATS_REQUEST,
  GET_PORTAL_STATS_SUCCESS,
} from "../types";
import axiosInstance, { portalId } from "../api";

export const getPortals = () => async (dispatch, getState) => {
  try {
    const {
      Auth: { user },
    } = getState();
    dispatch({ type: GET_PORTALS_REQUEST });
    // const { data: podsData } = await axios.get(
    //   "http://94.237.92.101:8000/api/portal",
    //   { headers: { authorization: "Bearer " + user.pods_token } }
    // );
    const { data: lahaData } = await axios.get(
      "https://api.lahasd.com/api/portal",
      { headers: { authorization: "Bearer " + user.laha_token } }
    );

    console.log({ lahaData });
    dispatch({ type: GET_PORTALS_SUCCESS, payload: lahaData.data });
  } catch (error) {
    dispatch({ type: GET_PORTALS_FAIL });
    console.log(error);
  }
};

export const getPortalStats = () => async (dispatch, getState) => {
  try {
    const {
      Auth: { user },
    } = getState();
    dispatch({ type: GET_PORTAL_STATS_REQUEST });
    // const { data: podsData } = await axios.get(
    //   "http://94.237.92.101:8000/api/portal",
    //   { headers: { authorization: "Bearer " + user.pods_token } }
    // );
    const { data: lahaData } = await axiosInstance.get(
      `https://api.lahasd.com/api/admin/${portalId}/params`,
      { headers: { authorization: "Bearer " + user.laha_token } }
    );

    console.log({ lahaData });
    dispatch({ type: GET_PORTAL_STATS_SUCCESS, payload: lahaData });
  } catch (error) {
    dispatch({ type: GET_PORTAL_STATS_FAIL, payload: error.message });
    console.log(error);
  }
};
