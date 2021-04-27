import * as MySongTypes from './mySong-types';

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
  mySongs: [],
};

const MySongReducer = (state = mySongInitialState, action) => {
  switch (action.type) {
    case MySongTypes.MY_SONG_GET_REQUEST: {
      return {
        ...state,
        isGettingSong: true,
        getSongError: null,
        getSongSuccess: false,
      };
    }
    case MySongTypes.MY_SONG_GET_ERROR: {
      return {
        ...state,
        isGettingSong: false,
        getSongError: action.payload,
        getSongSuccess: false,
      };
    }
    case MySongTypes.MY_SONG_GET_SUCCESS: {
      return {
        ...state,
        isGettingSong: false,
        getSongError: null,
        getSongSuccess: true,
        mySongs: action.payload,
      };
    }
    case MySongTypes.MY_SONG_EDIT_REQUEST: {
      return {
        ...state,
        isEditSong: true,
        editSongError: null,
        editSongSuccess: false,
      };
    }
    case MySongTypes.MY_SONG_EDIT_ERROR: {
      return {
        ...state,
        isEditSong: false,
        editSongSuccess: false,
        editSongError: action.payload,
      };
    }
    case MySongTypes.MY_SONG_EDIT_SUCCESS: {
      return {
        ...state,
        isEditSong: false,
        editSongError: null,
        editSongSuccess: true,
      };
    }
    case MySongTypes.MY_SONG_UPLOAD_REQUEST: {
      return {
        ...state,
        isUploadingSong: true,
        uploadSongError: null,
        uploadSongSuccess: false,
      };
    }
    case MySongTypes.MY_SONG_UPLOAD_ERROR: {
      return {
        ...state,
        isUploadingSong: false,
        uploadSongSuccess: false,
        uploadSongError: action.payload,
      };
    }
    case MySongTypes.MY_SONG_UPLOAD_SUCCESS: {
      return {
        ...state,
        isUploadingSong: false,
        uploadSongError: null,
        uploadSongSuccess: true,
      };
    }
    case MySongTypes.MY_SONG_UPLOAD_RESET: {
      return {
        ...state,
        isUploadingSong: false,
        uploadSongError: null,
        uploadSongSuccess: false,
      };
    }
    case MySongTypes.MY_SONG_LIKE_REQUEST: {
      return {
        ...state,
        isLikeSong: true,
        likeSongError: null,
        likeSongSuccess: false,
      };
    }
    case MySongTypes.MY_SONG_LIKE_ERROR: {
      return {
        ...state,
        isLikeSong: false,
        likeSongError: action.payload,
        likeSongSuccess: false,
      };
    }

    case MySongTypes.MY_SONG_LIKE_SUCCESS: {
      return {
        ...state,
        isLikeSong: false,
        likeSongError: null,
        likeSongSuccess: true,
      };
    }
    case MySongTypes.MY_SONG_DELETE_REQUEST: {
      return {
        ...state,
        isDelelteSong: true,
        delelteSongError: null,
        delelteSongSuccess: false,
      };
    }
    case MySongTypes.MY_SONG_DELETE_ERROR: {
      return {
        ...state,
        isDelelteSong: false,
        delelteSongError: action.payload,
        delelteSongSuccess: false,
      };
    }

    case MySongTypes.MY_SONG_DELETE_SUCCESS: {
      const newMySongs = [...state.mySongs];
      const index = newMySongs.findIndex((song) => song === action.payload);
      newMySongs.splice(index, 1);
      return {
        ...state,
        isDelelteSong: false,
        delelteSongError: null,
        delelteSongSuccess: true,
        mySongs: [...newMySongs],
      };
    }

    default:
      return state;
  }
};

export default MySongReducer;
