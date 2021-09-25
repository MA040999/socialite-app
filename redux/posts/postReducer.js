import {
  ADD_NOTIFICATION_MSG,
  CHANGE_PAGE,
  COMMENT,
  CREATE_POST,
  DELETE_POST,
  FETCH_COMMENTS,
  GET_POST,
  GET_POSTS,
  IS_COMMENT_ACTIVE,
  IS_CONFIRMATION_ACTIVE,
  IS_EDIT_ACTIVE,
  IS_SEARCH_ACTIVE,
  REMOVE_NOTIFICATION_MSG,
  REMOVE_POST,
  REMOVE_POSTS,
  RESET_PAGE,
  SEARCH,
  SELECTED_POST,
  START_LOADER,
  STOP_LOADER,
  UPDATE_POST,
} from "./postTypes";

const initialState = {
  posts: [],
  isEditActive: false,
  selectedPost: null,
  isConfirmationActive: false,
  page: 1,
  post: null,
  postComments: null,
  isCommentActive: false,
  isSearchActive: false,
  notificationMsg: null,
  isLoading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_POSTS:
      return {
        ...state,
        posts: [],
        page: 1,
      };
    case REMOVE_POST:
      return {
        ...state,
        post: null,
        postComments: null,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE_POST:
      return {
        ...state,
        posts:
          state.posts &&
          state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post
          ),
        post: state.post && action.payload,
      };
    case SEARCH:
      return {
        ...state,
        posts: action.payload,
      };
    case FETCH_COMMENTS:
      return {
        ...state,
        postComments: action.payload,
      };
    case COMMENT:
      return {
        ...state,
        post: state.post && action.payload,
      };
    case CREATE_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case SELECTED_POST:
      return {
        ...state,
        selectedPost: action.payload,
      };
    case RESET_PAGE:
      return {
        ...state,
        page: 1,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    case REMOVE_NOTIFICATION_MSG:
      return {
        ...state,
        notificationMsg: null,
      };
    case ADD_NOTIFICATION_MSG:
      return {
        ...state,
        notificationMsg: action.payload,
      };
    case IS_CONFIRMATION_ACTIVE:
      return { ...state, isConfirmationActive: !state.isConfirmationActive };
    case IS_COMMENT_ACTIVE:
      return {
        ...state,
        isCommentActive: !state.isCommentActive,
      };
    case IS_SEARCH_ACTIVE:
      return {
        ...state,
        isSearchActive: action.payload,
      };
    case START_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case STOP_LOADER:
      return {
        ...state,
        isLoading: false,
      };
    case IS_EDIT_ACTIVE:
      return { ...state, isEditActive: !state.isEditActive };
    default:
      return state;
  }
};

export default postReducer;
