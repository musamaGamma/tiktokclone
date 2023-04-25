import axios from "axios";

import { LOGOUT } from "./types";
import store from "./store";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Dispatch the logout action
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const portalId = 2;
