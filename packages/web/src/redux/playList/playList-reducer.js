import * as PlayListTypes from './playList-types';

export const PlayListInitialState = {
  playLists: {},
};

const PlayListReducer = (state = PlayListInitialState, action) => {
  switch (action.type) {
    case PlayListTypes.LOAD_PLAYLIST: {
      return {
        ...state,
        playLists: { ...state.playLists, ...action.payload },
      };
    }
    case PlayListTypes.REMOVE_PLAYLIST: {
      const newState = { ...state.playLists };
      delete newState[action.payload];
      return {
        ...state,
        playLists: { ...newState },
      };
    }
    default: {
      return state;
    }
  }
};

export default PlayListReducer;
