import { toggleInArrayById } from '../../utils/utils';
import * as PlayerTypes from './player-types';

export const playerInitialState = {
  currentPlaylist: [],
  currentIndexPlaylist: 0,
};

const playReducer = (state = playerInitialState, action) => {
  switch (action.type) {
    case PlayerTypes.PLAYER_PLAY: {
      return {
        ...state,
        currentPlaylist: [action.payload],
        currentIndexPlaylist: 0,
      };
    }
    case PlayerTypes.PLAYER_ADD_TO_QUEQUE: {
      return {
        ...state,
        currentPlaylist: [...state.currentPlaylist, action.payload],
      };
    }
    case PlayerTypes.PLAYER_CURRENT_INDEX_PLAYLIST: {
      return { ...state, currentIndexPlaylist: action.payload };
    }
    case PlayerTypes.PLAYER_SYNC_DELETE: {
      const newCurrentPlaylist = toggleInArrayById(
        state.currentPlaylist,
        action.payload,
      );
      return { ...state, currentPlaylist: [...newCurrentPlaylist] };
    }
    default: {
      return state;
    }
  }
};

export default playReducer;
