import {
  AUTH,
  LOGOUT,
  AUTH_ERROR,
  VERIFY_AUTH,
  UPDATE_PROFILE,
} from "./authTypes";
import app from "../../axiosConfig";
import {
  addNotificationMsg,
  startLoader,
  stopLoader,
} from "../posts/postActions";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
};

export const login = ({ email, password }, navigation) => {
  return async (dispatch) => {
    try {
      dispatch(startLoader());

      const user = await app.post("/auth/login/", { email, password });
      await SecureStore.setItemAsync(
        "__refresh__token",
        String(user?.data.refreshToken)
      );

      delete user?.data.refreshToken;
      dispatch({ type: AUTH, payload: user?.data });

      navigation.navigate("HomeScreen");
      dispatch(stopLoader());
    } catch (error) {
      if (error.response) {
        // There is an error response from the server
        // You can anticipate error.response.data here
        const error = err.response.data;
        dispatch(addNotificationMsg(error.response.data.message));
      } else if (error.request) {
        // The request was made but no response was received
        // Error details are stored in error.reqeust
        console.log(error.request);
      } else {
        // Some other errors
        console.log("Error", error.message);
      }
      dispatch(stopLoader());
    }
  };
};

export const updateProfile = (formData, history) => {
  return async (dispatch) => {
    try {
      dispatch(startLoader());

      const { data } = await app.put("/auth/update-profile/", formData);
      dispatch({ type: UPDATE_PROFILE, payload: data });

      history.push("/");
      dispatch(stopLoader());
    } catch (error) {
      dispatch(stopLoader());
      dispatch(addNotificationMsg(error.response.data.message));
    }
  };
};

export const verifyAuth = () => {
  return async (dispatch) => {
    try {
      const user = await app.get("/auth/verify-auth");
      dispatch({ type: VERIFY_AUTH, payload: user?.data });
    } catch (error) {
      dispatch(stopLoader());
      dispatch(addNotificationMsg(error.response.data.message));
      dispatch({ type: LOGOUT });
    }
  };
};

export const verifyRefreshToken = (token) => {
  return async (dispatch) => {
    try {
      const user = await axios.get(
        "http://192.168.100.59:4000/auth/refresh-token",
        {
          headers: { "X-Access-Token": token },
        }
      );
      dispatch({ type: AUTH, payload: user?.data });
    } catch {
      dispatch(stopLoader());
      dispatch({ type: LOGOUT });
    }
  };
};

export const signup = ({ fullname, email, password }, history) => {
  return async (dispatch) => {
    try {
      dispatch(startLoader());

      const user = await app.post("/auth/signup", {
        fullname,
        email,
        password,
      });
      dispatch({ type: AUTH, payload: user?.data });

      history.push("/");
      dispatch(stopLoader());
    } catch (error) {
      dispatch(stopLoader());

      dispatch(addNotificationMsg(error.response.data.message));
    }
  };
};

export const logout = (history) => {
  return async (dispatch) => {
    try {
      dispatch(startLoader());

      await app.get("/auth/logout/");
      dispatch({ type: LOGOUT });
      history.push("/");
      dispatch(stopLoader());
    } catch (error) {
      dispatch(stopLoader());
    }
  };
};