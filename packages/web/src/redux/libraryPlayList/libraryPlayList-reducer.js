import * as LibraryPlayListTypes from './libraryPlayList-types';

const userPlayListInitialState = {
  isCreatingPlayList: false,
  createPlayListSuccess: false,
  createPlayListError: null,
  isGettingPlaylist: false,
  getPlaylistError: null,
  getPlaylistSuccess: false,
  currentPath: LibraryPlayListTypes.USER_PLAYLIST_PATH_OWN_PLAYLIST,
  userPlaylists: [],
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
    case LibraryPlayListTypes.USER_PLAYLIST_GET_REQUEST: {
      return {
        ...state,
        isGettingPlaylist: true,
        getPlaylistError: null,
        getPlaylistSuccess: false,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_GET_ERROR: {
      return {
        ...state,
        isGettingPlaylist: false,
        getPlaylistError: action.payload,
        getPlaylistSuccess: false,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_GET_SUCCESS: {
      return {
        ...state,
        isGettingPlaylist: false,
        getPlaylistError: null,
        getPlaylistSuccess: true,
        userPlaylists: [...action.payload],
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_SET_CURRENT_PATH: {
      return {
        ...state,
        currentPath: action.payload,
      };
    }
    default:
      return state;
  }
};
export default LibraryPlayListReducer;
