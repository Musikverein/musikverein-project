import * as SongTypes from './song-types';

export const SongInitialState = {
  songs: {},
};

const SongReducer = (state = SongInitialState, action) => {
  switch (action.type) {
    case SongTypes.LOAD_SONGS: {
      return {
        ...state,
        songs: { ...state.songs, ...action.payload },
      };
    }
    case SongTypes.REMOVE_SONG: {
      const newState = { ...state.songs };
      delete newState[action.payload];
      return {
        ...state,
        songs: { ...newState },
      };
    }
    default: {
      return state;
    }
  }
};

export default SongReducer;
