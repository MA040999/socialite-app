import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./auth/authReducer";
import postReducer from "./posts/postReducer";

const reducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
