import axios from "axios";
import {
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
} from "../types";

export const login = (user) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    const { data: lahadata } = await axios.post(
      "https://api.lahasd.com/api/admin/login",
      user
    );
    const { data: podsData } = await axios.post(
      "http://94.237.92.101:8000/api/admin/login",
      user
    );

    localStorage.setItem(
      "user",
      JSON.stringify({
        laha_token: lahadata.token,
        pods_token: podsData.token,
        authenticated: true,
      })
    );
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: {
        laha_token: lahadata.token,
        pods_token: podsData.token,
        authenticated: true,
      },
    });
  } catch (error) {
    dispatch({ type: LOGIN_USER_FAIL, payload: error.message });
  }
};
