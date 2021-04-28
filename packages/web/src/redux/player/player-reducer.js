import { toggleInArrayById } from '../../utils/utils';
import * as PlayerTypes from './player-types';

export const playerInitialState = {
  currentPlayList: [],
  currentIndexPlayList: 0,
};

const playReducer = (state = playerInitialState, action) => {
  switch (action.type) {
    case PlayerTypes.PLAYER_PLAY: {
      return {
        ...state,
        currentPlayList: [action.payload],
        currentIndexPlayList: 0,
      };
    }
    case PlayerTypes.PLAYER_ADD_TO_QUEQUE: {
      return {
        ...state,
        currentPlayList: [...state.currentPlayList, action.payload],
      };
    }
    case PlayerTypes.PLAYER_CURRENT_INDEX_PLAYLIST: {
      return { ...state, currentIndexPlayList: action.payload };
    }
    case PlayerTypes.PLAYER_SYNC_SONG_DELETE: {
      const newCurrentPlayList = toggleInArrayById(
        state.currentPlayList,
        action.payload,
      );
      return { ...state, currentPlayList: [...newCurrentPlayList] };
    }
    case PlayerTypes.PLAYER_SYNC_PLAYLIST_DELETE: {
      // TODO: Eliminar la playlist actual, si la playlist es eliminada.
      return { ...state };
    }
    default: {
      return state;
    }
  }
};

export default playReducer;
