import * as HomeTypes from './home-types';

const homeInitialState = {
  isGettingTrendSongs: false,
  getTrendSongsError: null,
  getTrendSongsSuccess: false,
  trendSongs: [],

  isGettingTrendPlayLists: false,
  getTrendPlayListsError: null,
  getTrendPlayListsSuccess: false,
  trendPlayLists: [],

  isGettingTrendUsers: false,
  getTrendUsersError: null,
  getTrendUsersSuccess: false,
  trendUsers: [],

  isGettingTrendPlayed: false,
  getTrendPlayedError: null,
  getTrendPlayedSuccess: false,
  trendPlayed: [],
};

const HomeReducer = (state = homeInitialState, action) => {
  switch (action.type) {
    case HomeTypes.GET_TREND_SONG_REQUEST: {
      return {
        ...state,
        isGettingTrendSongs: true,
        getTrendSongsError: null,
        getTrendSongsSuccess: false,
      };
    }
    case HomeTypes.GET_TREND_SONG_ERROR: {
      return {
        ...state,
        isGettingTrendSongs: false,
        getTrendSongsError: action.payload,
        getTrendSongsSuccess: false,
        trendSongs: [],
      };
    }
    case HomeTypes.GET_TREND_SONG_SUCCESS: {
      return {
        ...state,
        isGettingTrendSongs: false,
        getTrendSongsError: null,
        getTrendSongsSuccess: true,
        trendSongs: [...action.payload],
      };
    }
    case HomeTypes.GET_TREND_PLAYLIST_REQUEST: {
      return {
        ...state,
        isGettingTrendPlayLists: true,
        getTrendPlayListsError: null,
        getTrendPlayListsSuccess: false,
      };
    }
    case HomeTypes.GET_TREND_PLAYLIST_ERROR: {
      return {
        ...state,
        isGettingTrendPlayLists: false,
        getTrendPlayListsError: action.payload,
        getTrendPlayListsSuccess: false,
      };
    }
    case HomeTypes.GET_TREND_PLAYLIST_SUCCESS: {
      return {
        ...state,
        isGettingTrendPlayLists: false,
        getTrendPlayListsError: null,
        getTrendPlayListsSuccess: true,
        trendPlayLists: [...action.payload],
      };
    }
    case HomeTypes.GET_TREND_USER_REQUEST: {
      return {
        ...state,
        isGettingTrendUsers: true,
        getTrendUsersError: null,
        getTrendUsersSuccess: false,
      };
    }
    case HomeTypes.GET_TREND_USER_ERROR: {
      return {
        ...state,
        isGettingTrendUsers: false,
        getTrendUsersError: action.payload,
        getTrendUsersSuccess: false,
      };
    }
    case HomeTypes.GET_TREND_USER_SUCCESS: {
      return {
        ...state,
        isGettingTrendUsers: false,
        getTrendUsersError: null,
        getTrendUsersSuccess: true,
        trendUsers: [...action.payload],
      };
    }
    case HomeTypes.GET_TREND_PLAYED_REQUEST: {
      return {
        ...state,
        isGettingTrendPlayed: true,
        getTrendPlayedError: null,
        getTrendPlayedSuccess: false,
      };
    }
    case HomeTypes.GET_TREND_PLAYED_ERROR: {
      return {
        ...state,
        isGettingTrendPlayed: false,
        getTrendPlayedError: action.payload,
        getTrendPlayedSuccess: false,
      };
    }
    case HomeTypes.GET_TREND_PLAYED_SUCCESS: {
      return {
        ...state,
        isGettingTrendPlayed: false,
        getTrendPlayedError: null,
        getTrendPlayedSuccess: true,
        trendPlayed: [...action.payload],
      };
    }
    default:
      return state;
  }
};

export default HomeReducer;
