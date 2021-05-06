import * as UserViewTypes from './userView-types';

const userViewInitialState = {
  isGettingUserView: false,
  getUserViewError: null,
  getUserViewSuccess: false,
  isGettingUserViewSongs: false,
  getUserViewSongsError: null,
  getUserViewSongsSuccess: false,
  isGettingUserViewPlayLists: false,
  getUserViewPlayListsError: null,
  getUserViewPlayListsSuccess: false,
  isGettingUserViewFollowed: false,
  getUserViewFollowedError: null,
  getUserViewFollowedSuccess: false,
  isGettingUserViewFollowing: false,
  getUserViewFollowingError: null,
  getUserViewFollowingSuccess: false,
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
        getUserViewSongsError: null,
        getUserViewSongsSuccess: false,
      };
    }
    case UserViewTypes.USER_VIEW_GET_SONGS_ERROR: {
      return {
        ...state,
        isGettingUserViewSongs: false,
        getUserViewSongsError: action.payload,
        getUserViewSongsSuccess: false,
      };
    }
    case UserViewTypes.USER_VIEW_GET_SONGS_SUCCESS: {
      return {
        ...state,
        isGettingUserViewSongs: false,
        getUserViewSongsError: null,
        getUserViewSongsSuccess: true,
        userSongs: [...action.payload],
      };
    }
    case UserViewTypes.USER_VIEW_GET_PLAYLISTS_REQUEST: {
      return {
        ...state,
        isGettingUserViewPlayLists: true,
        getUserViewPlayListsError: null,
        getUserViewPlayListsSuccess: false,
      };
    }
    case UserViewTypes.USER_VIEW_GET_PLAYLISTS_ERROR: {
      return {
        ...state,
        isGettingUserViewPlayLists: false,
        getUserViewPlayListsError: action.payload,
        getUserViewPlayListsSuccess: false,
      };
    }
    case UserViewTypes.USER_VIEW_GET_PLAYLISTS_SUCCESS: {
      return {
        ...state,
        isGettingUserViewPlayLists: false,
        getUserViewPlayListsError: null,
        getUserViewPlayListsSuccess: true,
        userPlayLists: [...action.payload],
      };
    }
    case UserViewTypes.USER_VIEW_GET_FOLLOWEDBY_REQUEST: {
      return {
        ...state,
        isGettingUserViewFollowed: true,
        getUserViewFollowedError: null,
        getUserViewFollowedSuccess: false,
      };
    }
    case UserViewTypes.USER_VIEW_GET_FOLLOWEDBY_ERROR: {
      return {
        ...state,
        isGettingUserViewFollowed: false,
        getUserViewFollowedError: action.payload,
        getUserViewFollowedSuccess: false,
      };
    }
    case UserViewTypes.USER_VIEW_GET_FOLLOWEDBY_SUCCESS: {
      return {
        ...state,
        isGettingUserViewFollowed: false,
        getUserViewFollowedError: null,
        getUserViewFollowedSuccess: true,
      };
    }
    case UserViewTypes.USER_VIEW_GET_FOLLOWING_REQUEST: {
      return {
        ...state,
        isGettingUserViewFollowing: true,
        getUserViewFollowingError: null,
        getUserViewFollowingSuccess: false,
      };
    }
    case UserViewTypes.USER_VIEW_GET_FOLLOWING_ERROR: {
      return {
        ...state,
        isGettingUserViewFollowing: false,
        getUserViewFollowingError: action.payload,
        getUserViewFollowingSuccess: false,
      };
    }
    case UserViewTypes.USER_VIEW_GET_FOLLOWING_SUCCESS: {
      return {
        ...state,
        isGettingUserViewFollowing: false,
        getUserViewFollowingError: null,
        getUserViewFollowingSuccess: true,
      };
    }
    default:
      return state;
  }
};
export default UserViewReducer;