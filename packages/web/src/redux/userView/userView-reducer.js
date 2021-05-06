import * as UserViewTypes from './userView-types';

const userViewInitialState = {
  isGettingUserView: false,
  getUserViewError: null,
  getUserViewSuccess: false,
  isGettingUserViewSongs: false,
  getUserViewErrorSongs: null,
  getUserViewSuccessSongs: false,
  isGettingUserViewPlayLists: false,
  getUserViewErrorPlayLists: null,
  getUserViewSuccessPlayLists: false,
  userSongs: [],
  userPlayLists: [],
};

const UserViewReducer = (state = userViewInitialState, action) => {
  switch (action.type) {
    case UserViewTypes.USER_VIEW_GET_REQUEST: {
      return {
        ...state,
        isGettingUserView: true,
        getUserViewError: null,
        getUserViewSuccess: false,
      };
    }
    case UserViewTypes.USER_VIEW_GET_ERROR: {
      return {
        ...state,
        isGettingUserView: false,
        getUserViewError: action.payload,
        getUserViewSuccess: false,
      };
    }
    case UserViewTypes.USER_VIEW_GET_SUCCESS: {
      return {
        ...state,
        isGettingUserView: false,
        getUserViewError: null,
        getUserViewSuccess: true,
      };
    }
    case UserViewTypes.USER_VIEW_GET_SONGS_REQUEST: {
      return {
        ...state,
        isGettingUserViewSongs: true,
        getUserViewErrorSongs: null,
        getUserViewSuccessSongs: false,
      };
    }
    case UserViewTypes.USER_VIEW_GET_SONGS_ERROR: {
      return {
        ...state,
        isGettingUserViewSongs: false,
        getUserViewErrorSongs: action.payload,
        getUserViewSuccessSongs: false,
      };
    }
    case UserViewTypes.USER_VIEW_GET_SONGS_SUCCESS: {
      return {
        ...state,
        isGettingUserViewSongs: false,
        getUserViewErrorSongs: null,
        getUserViewSuccessSongs: true,
        userSongs: [...action.payload],
      };
    }
    case UserViewTypes.USER_VIEW_GET_PLAYLISTS_REQUEST: {
      return {
        ...state,
        isGettingUserViewPlayLists: true,
        getUserViewErrorPlayLists: null,
        getUserViewSuccessPlayLists: false,
      };
    }
    case UserViewTypes.USER_VIEW_GET_PLAYLISTS_ERROR: {
      return {
        ...state,
        isGettingUserViewPlayLists: false,
        getUserViewErrorPlayLists: action.payload,
        getUserViewSuccessPlayLists: false,
      };
    }
    case UserViewTypes.USER_VIEW_GET_PLAYLISTS_SUCCESS: {
      return {
        ...state,
        isGettingUserViewPlayLists: false,
        getUserViewErrorPlayLists: null,
        getUserViewSuccessPlayLists: true,
        userPlayLists: [...action.payload],
      };
    }
    default:
      return state;
  }
};
export default UserViewReducer;
