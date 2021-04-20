import * as SongTypes from './song-types';

export const SongInitialState = {
  isUploadingSong: false,
  uploadSongError: null,
  uploadSongSuccess: false,
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
    default: {
      return state;
    }
  }
};

export default SongReducer;
