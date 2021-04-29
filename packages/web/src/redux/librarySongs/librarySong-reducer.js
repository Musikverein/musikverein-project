import { toggleInArrayById } from '../../utils/utils';
import * as LibrarySongTypes from './librarySong-types';

const mySongInitialState = {
  isGettingSong: false,
  getSongError: null,
  getSongSuccess: false,
  isUploadingSong: false,
  uploadSongError: null,
  uploadSongSuccess: false,
  isLikeSong: false,
  likeSongError: null,
  likeSongSuccess: false,
  isDeleteSong: false,
  deleteSongError: null,
  deleteSongSuccess: false,
  isEditSong: false,
  editSongError: null,
  editSongSuccess: false,
  currentPath: LibrarySongTypes.USER_SONG_PATH_OWN_SONGS,
  userSongs: [],
};

const LibrarySongReducer = (state = mySongInitialState, action) => {
  switch (action.type) {
    case LibrarySongTypes.USER_SONG_GET_REQUEST: {
      return {
        ...state,
        isGettingSong: true,
        getSongError: null,
        getSongSuccess: false,
      };
    }
    case LibrarySongTypes.USER_SONG_GET_ERROR: {
      return {
        ...state,
        isGettingSong: false,
        getSongError: action.payload,
        getSongSuccess: false,
      };
    }
    case LibrarySongTypes.USER_SONG_GET_SUCCESS: {
      return {
        ...state,
        isGettingSong: false,
        getSongError: null,
        getSongSuccess: true,
        userSongs: action.payload,
      };
    }
    case LibrarySongTypes.USER_SONG_EDIT_REQUEST: {
      return {
        ...state,
        isEditSong: true,
        editSongError: null,
        editSongSuccess: false,
      };
    }
    case LibrarySongTypes.USER_SONG_EDIT_ERROR: {
      return {
        ...state,
        isEditSong: false,
        editSongSuccess: false,
        editSongError: action.payload,
      };
    }
    case LibrarySongTypes.USER_SONG_EDIT_SUCCESS: {
      return {
        ...state,
        isEditSong: false,
        editSongError: null,
        editSongSuccess: true,
      };
    }
    case LibrarySongTypes.USER_SONG_UPLOAD_REQUEST: {
      return {
        ...state,
        isUploadingSong: true,
        uploadSongError: null,
        uploadSongSuccess: false,
      };
    }
    case LibrarySongTypes.USER_SONG_UPLOAD_ERROR: {
      return {
        ...state,
        isUploadingSong: false,
        uploadSongSuccess: false,
        uploadSongError: action.payload,
      };
    }
    case LibrarySongTypes.USER_SONG_UPLOAD_SUCCESS: {
      return {
        ...state,
        isUploadingSong: false,
        uploadSongError: null,
        uploadSongSuccess: true,
      };
    }
    case LibrarySongTypes.USER_SONG_UPLOAD_RESET: {
      return {
        ...state,
        isUploadingSong: false,
        uploadSongError: null,
        uploadSongSuccess: false,
      };
    }
    case LibrarySongTypes.USER_SONG_LIKE_REQUEST: {
      return {
        ...state,
        isLikeSong: true,
        likeSongError: null,
        likeSongSuccess: false,
      };
    }
    case LibrarySongTypes.USER_SONG_LIKE_ERROR: {
      return {
        ...state,
        isLikeSong: false,
        likeSongError: action.payload,
        likeSongSuccess: false,
      };
    }
    case LibrarySongTypes.USER_SONG_LIKE_SUCCESS: {
      return {
        ...state,
        isLikeSong: false,
        likeSongError: null,
        likeSongSuccess: true,
      };
    }
    case LibrarySongTypes.USER_SONG_DELETE_REQUEST: {
      return {
        ...state,
        isDelelteSong: true,
        delelteSongError: null,
        delelteSongSuccess: false,
      };
    }
    case LibrarySongTypes.USER_SONG_DELETE_ERROR: {
      return {
        ...state,
        isDelelteSong: false,
        delelteSongError: action.payload,
        delelteSongSuccess: false,
      };
    }
    case LibrarySongTypes.USER_SONG_DELETE_SUCCESS: {
      const newUserSongs = toggleInArrayById(state.userSongs, action.payload);
      return {
        ...state,
        isDelelteSong: false,
        delelteSongError: null,
        delelteSongSuccess: true,
        userSongs: [...newUserSongs],
      };
    }
    case LibrarySongTypes.USER_SONG_SET_CURRENT_PATH: {
      return {
        ...state,
        currentPath: action.payload,
      };
    }
    case LibrarySongTypes.USER_SONG_SYNC_LIKE: {
      const newUserSongs = toggleInArrayById(state.userSongs, action.payload);
      return {
        ...state,
        userSongs: [...newUserSongs],
      };
    }
    default:
      return state;
  }
};

export default LibrarySongReducer;
