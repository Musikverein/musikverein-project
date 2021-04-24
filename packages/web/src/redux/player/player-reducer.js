import * as PlayerTypes from './player-types';

export const playerInitialState = {
  isPlayingSong: false,
  songs: [],
  currentIndexPlaylist: 0,
};

const playReducer = (state = playerInitialState, action) => {
  switch (action.type) {
    case PlayerTypes.PLAYER_PLAY: {
      return {
        ...state,
        isPlayingSong: true,
        songs: [...state.songs, action.payload],
      };
    }
    case PlayerTypes.PLAYER_CURRENT_INDEX_PLAYLIST: {
      return { ...state, currentIndexPlaylist: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default playReducer;
