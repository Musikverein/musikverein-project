import * as PlayerTypes from './player-types';

export const playerInitialState = {
  isPlayingSong: false,
  currentPlaylist: [],
  currentIndexPlaylist: 0,
};

const playReducer = (state = playerInitialState, action) => {
  switch (action.type) {
    case PlayerTypes.PLAYER_PLAY: {
      return {
        ...state,
        isPlayingSong: true,
        currentPlaylist: [action.payload],
        currentIndexPlaylist: 0,
      };
    }
    case PlayerTypes.PLAYER_ADD_TO_QUEQUE: {
      return {
        ...state,
        isPlayingSong: true,
        currentPlaylist: [...state.currentPlaylist, action.payload],
      };
    }
    case PlayerTypes.PLAYER_CURRENT_INDEX_PLAYLIST: {
      return { ...state, currentIndexPlaylist: action.payload };
    }
    case PlayerTypes.PLAYER_SYNC_DELETE: {
      const newCurrentPlaylist = [...state.currentPlaylist];
      const index = newCurrentPlaylist.findIndex(
        (song) => song === action.payload,
      );
      newCurrentPlaylist.splice(index, 1);
      return { ...state, currentPlaylist: [...newCurrentPlaylist] };
    }
    default: {
      return state;
    }
  }
};

export default playReducer;
