import axios from "axios";
import { API_BASE_URL } from "./common/common";

import store from "./redux/store";

// the baseURL should to point to localhost in development
// and your domain in production
const app = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

app.interceptors.request.use((req) => {
  const token = store.getState().auth.token;

  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  } else {
    req.headers.authorization = null;
  }

  return req;
});

export default app;
