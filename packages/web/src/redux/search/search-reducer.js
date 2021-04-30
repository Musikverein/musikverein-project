import * as SearchTypes from './search-types';

const searchInitialState = {
  isSearchingSong: false,
  searchSongError: null,
  searchSongSuccess: false,
  songs: [],
  isSearchingPlayList: false,
  searchPlayListError: null,
  searchPlayListSuccess: false,
  playlists: [],
};

const SearchReducer = (state = searchInitialState, action) => {
  switch (action.type) {
    case SearchTypes.SEARCH_SONG_REQUEST: {
      return {
        ...state,
        isSearchingSong: true,
        searchSongError: null,
        searchSongSuccess: false,
      };
    }
    case SearchTypes.SEARCH_SONG_ERROR: {
      return {
        ...state,
        isSearchingSong: false,
        searchSongError: action.payload,
        searchSongSuccess: false,
      };
    }
    case SearchTypes.SEARCH_SONG_SUCCESS: {
      return {
        ...state,
        isSearchingSong: false,
        searchSongError: null,
        searchSongSuccess: true,
        songs: [...action.payload],
      };
    }
    case SearchTypes.SEARCH_PLAYLIST_REQUEST: {
      return {
        ...state,
        isSearchingPlayList: true,
        searchPlayListError: null,
        searchPlayListSuccess: false,
      };
    }
    case SearchTypes.SEARCH_PLAYLIST_ERROR: {
      return {
        ...state,
        isSearchingPlayList: false,
        searchPlayListError: action.payload,
        searchPlayListSuccess: false,
      };
    }
    case SearchTypes.SEARCH_PLAYLIST_SUCCESS: {
      return {
        ...state,
        isSearchingPlayList: false,
        searchPlayListError: null,
        searchPlayListSuccess: true,
        playlists: [...action.payload],
      };
    }
    default:
      return state;
  }
};
export default SearchReducer;
