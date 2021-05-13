import * as PlayerTypes from './player-types';

export const playerInitialState = {
  queue: [],
  playingNow: '',

  isAddingSongPlayed: false,
  songPlayedError: null,
  songPlayedSuccess: false,
};

const playReducer = (state = playerInitialState, action) => {
  switch (action.type) {
    case PlayerTypes.PLAYER_PLAY: {
      return {
        ...state,
        playingNow: action.payload,
        queue: [],
      };
    }
    case PlayerTypes.PLAYER_ADD_TO_QUEUE: {
      if (
        state.playingNow === action.payload ||
        state.queue.includes(action.payload)
      ) {
        return { ...state };
      }
      if (state.queue.length === 0 && !state.playingNow) {
        return {
          ...state,
          playingNow: action.payload,
        };
      }
      return {
        ...state,
        queue: [...state.queue, action.payload],
      };
    }

    case PlayerTypes.PLAYER_SYNC_SONG_DELETE: {
      if (state.queue.length > 0) {
        const newQueue = [...state.queue];
        const index = state.queue.indexOf(action.payload);
        if (index !== -1) {
          newQueue.splice(index, 1);
          return {
            ...state,
            queue: newQueue,
          };
        }
        if (action.payload === state.playingNow) {
          return {
            ...state,
            playingNow: newQueue[0],
            queue: [...newQueue.slice(1)],
          };
        }
      }
      if (action.payload === state.playingNow) {
        return {
          ...state,
          playingNow: '',
        };
      }
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
      if (state.queue.length === 0) {
        return {
          ...state,
          playingNow: '',
        };
      }
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
    case PlayerTypes.PLAYER_PLAY_SPECIFIC_SONG_IN_QUEUE: {
      const index = state.queue.indexOf(action.payload.songId);
      return {
        ...state,
        playingNow: state.queue[index],
        queue: [
          ...state.queue.slice(index + 1),
          ...state.queue.slice(0, index),
          state.playingNow,
        ],
      };
    }
    case PlayerTypes.PLAYER_RESET: {
      return {
        ...state,
        ...playerInitialState,
      };
    }
    case PlayerTypes.PLAYER_ADD_SONG_PLAYED_REQUEST: {
      return {
        ...state,
        isAddingSongPlayed: true,
        songPlayedError: null,
        songPlayedSuccess: false,
      };
    }
    case PlayerTypes.PLAYER_ADD_SONG_PLAYED_ERROR: {
      return {
        ...state,
        isAddingSongPlayed: true,
        songPlayedError: action.payload,
        songPlayedSuccess: false,
      };
    }
    case PlayerTypes.PLAYER_ADD_SONG_PLAYED_SUCCESS: {
      return {
        ...state,
        isAddingSongPlayed: true,
        songPlayedError: null,
        songPlayedSuccess: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default playReducer;
