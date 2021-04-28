import { toggleInArrayById } from '../../utils/utils';
import * as LibraryPlayListTypes from './libraryPlayList-types';

const userPlayListInitialState = {
  isCreatingPlayList: false,
  createPlayListSuccess: false,
  createPlayListError: null,
  isGettingPlayList: false,
  getPlayListError: null,
  getPlayListSuccess: false,
  isDeletePlayList: false,
  deletePlayListError: null,
  deletePlayListSuccess: false,
  currentPath: LibraryPlayListTypes.USER_PLAYLIST_PATH_OWN_PLAYLIST,
  userPlayLists: [],
};

const LibraryPlayListReducer = (state = userPlayListInitialState, action) => {
  switch (action.type) {
    case LibraryPlayListTypes.USER_PLAYLIST_CREATE_REQUEST: {
      return {
        ...state,
        isCreatingPlayList: true,
        createPlayListSuccess: null,
        createPlayListError: false,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_CREATE_ERROR: {
      return {
        ...state,
        isCreatingPlayList: false,
        createPlayListSuccess: false,
        createPlayListError: action.payload,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_CREATE_SUCCESS: {
      return {
        ...state,
        isCreatingPlayList: false,
        createPlayListSuccess: true,
        createPlayListError: null,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_CREATE_RESET: {
      return {
        ...state,
        isCreatingPlayList: false,
        createPlayListSuccess: false,
        createPlayListError: null,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_GET_REQUEST: {
      return {
        ...state,
        isGettingPlayList: true,
        getPlayListError: null,
        getPlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_GET_ERROR: {
      return {
        ...state,
        isGettingPlayList: false,
        getPlayListError: action.payload,
        getPlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_GET_SUCCESS: {
      return {
        ...state,
        isGettingPlayList: false,
        getPlayListError: null,
        getPlayListSuccess: true,
        userPlayLists: [...action.payload],
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_SET_CURRENT_PATH: {
      return {
        ...state,
        currentPath: action.payload,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_DELETE_REQUEST: {
      return {
        ...state,
        isDeleltePlayList: true,
        deleltePlayListError: null,
        deleltePlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_DELETE_ERROR: {
      return {
        ...state,
        isDeleltePlayList: false,
        deleltePlayListError: action.payload,
        deleltePlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_DELETE_SUCCESS: {
      const newUserPlayLists = toggleInArrayById(
        state.userPlayLists,
        action.payload,
      );
      return {
        ...state,
        isDeleltePlayList: false,
        deleltePlayListError: null,
        deleltePlayListSuccess: true,
        userPlayLists: [...newUserPlayLists],
      };
    }
    default:
      return state;
  }
};
export default LibraryPlayListReducer;
