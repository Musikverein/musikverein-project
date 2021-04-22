import * as PlayerTypes from './player-types';

export const playerInitialState = {
  isPlayingSong: false,
  songs: [],
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
    default: {
      return state;
    }
  }
};

export default playReducer;
