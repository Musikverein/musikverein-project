import * as LibraryPlayListTypes from './libraryPlayList-types';

const userPlayListInitialState = {
  isCreatingPlayList: false,
  createPlayListSuccess: false,
  createPlayListError: null,
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
    default:
      return state;
  }
};
export default LibraryPlayListReducer;
