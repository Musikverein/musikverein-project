import * as SongTypes from './song-types';

export const SongInitialState = {
  isUploadingSong: false,
  uploadSongError: null,
  uploadSongSuccess: false,
  isGettingSong: false,
  getSongError: null,
  getSongSuccess: false,
  songs: [],
};

const SongReducer = (state = SongInitialState, action) => {
  switch (action.type) {
    case SongTypes.SONG_UPLOAD_REQUEST: {
      return {
        ...state,
        isUploadingSong: true,
        uploadSongError: null,
        uploadSongSuccess: false,
      };
    }
    case SongTypes.SONG_UPLOAD_ERROR: {
      return {
        ...state,
        isUploadingSong: false,
        uploadSongSuccess: false,
        uploadSongError: action.payload,
      };
    }
    case SongTypes.SONG_UPLOAD_SUCCESS: {
      return {
        ...state,
        isUploadingSong: false,
        uploadSongError: null,
        uploadSongSuccess: true,
      };
    }
    case SongTypes.SONG_GET_REQUEST: {
      return {
        ...state,
        isGettingSong: true,
        getSongError: null,
        getSongSuccess: false,
        songs: [],
      };
    }
    case SongTypes.SONG_GET_ERROR: {
      return {
        ...state,
        isGettingSong: false,
        getSongError: action.payload,
        getSongSuccess: false,
      };
    }
    case SongTypes.SONG_GET_SUCCESS: {
      return {
        ...state,
        isGettingSong: false,
        getSongError: null,
        getSongSuccess: true,
        songs: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default SongReducer;
