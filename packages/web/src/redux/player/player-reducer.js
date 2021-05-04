import { toggleInArrayById } from '../../utils/utils';
import * as PlayerTypes from './player-types';

export const playerInitialState = {
  queue: [],
  playingNow: '',
};

const playReducer = (state = playerInitialState, action) => {
  switch (action.type) {
    case PlayerTypes.PLAYER_PLAY: {
      return {
        ...state,
        playingNow: [action.payload],
        queue: [],
      };
    }
    case PlayerTypes.PLAYER_ADD_TO_QUEUE: {
      return {
        ...state,
        queue: [...state.queue, action.payload],
      };
    }
    case PlayerTypes.PLAYER_SYNC_SONG_DELETE: {
      const newQueue = toggleInArrayById(state.queue, action.payload);
      return { ...state, queue: [...newQueue] };
    }
    case PlayerTypes.PLAYER_SYNC_PLAYLIST_DELETE: {
      // TODO: Eliminar la playlist actual, si la playlist es eliminada.
      return { ...state };
    }
    case PlayerTypes.PLAYER_PLAY_PLAYLIST: {
      const { songs, songIndex } = action.payload;
      return {
        ...state,
        playingNow: songs[songIndex],
        queue: [...songs.slice(songIndex + 1), ...songs.slice(0, songIndex)],
      };
    }
    case PlayerTypes.PLAYER_NEXT: {
      return {
        ...state,
        queue: [...state.queue.slice(1), state.playingNow],
        playingNow: state.queue[0],
      };
    }
    case PlayerTypes.PLAYER_PREV: {
      return {
        ...state,
        queue: [
          state.playingNow,
          ...state.queue.slice(0, state.queue.length - 1),
        ],
        playingNow: state.queue[state.queue.length - 1],
      };
    }
    case PlayerTypes.PLAYER_REORDER_QUEUE: {
      return {
        ...state,
        queue: [...action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default playReducer;
