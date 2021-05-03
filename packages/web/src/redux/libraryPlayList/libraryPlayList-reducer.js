import { toggleInArrayById } from '../../utils/utils';
import * as LibraryPlayListTypes from './libraryPlayList-types';

const userPlayListInitialState = {
  isCreatingPlayList: false,
  createPlayListSuccess: false,
  createPlayListError: null,
  isGettingUserPlayList: false,
  getUserPlayListError: null,
  getUserPlayListSuccess: false,
  isGettingPlayList: false,
  getPlayListError: null,
  getPlayListSuccess: false,
  isDeletePlayList: false,
  deletePlayListError: null,
  deletePlayListSuccess: false,
  isLikePlayList: false,
  likePlayListError: null,
  likePlayListSuccess: false,
  isEditPlayList: false,
  editPlayListError: null,
  editPlayListSuccess: false,
  isAddSongToPlayList: false,
  addSongToPlayListError: null,
  addSongToPlayListSuccess: false,
  isRemoveSongFromPlayList: false,
  removeSongFromPlayListError: null,
  removeSongFromPlayListSuccess: false,
  isUpdateOrderPlayList: false,
  updateOrderPlayListError: null,
  updateOrderPlayListSuccess: false,
  currentPath: LibraryPlayListTypes.USER_PLAYLIST_PATH_OWN_PLAYLIST,
  userPlayLists: [],
};

const LibraryPlayListReducer = (state = userPlayListInitialState, action) => {
  switch (action.type) {
    case LibraryPlayListTypes.USER_PLAYLIST_CREATE_REQUEST: {
      return {
        ...state,
        isCreatingPlayList: true,
        createPlayListSuccess: null,
        createPlayListError: false,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_CREATE_ERROR: {
      return {
        ...state,
        isCreatingPlayList: false,
        createPlayListSuccess: false,
        createPlayListError: action.payload,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_CREATE_SUCCESS: {
      return {
        ...state,
        isCreatingPlayList: false,
        createPlayListSuccess: true,
        createPlayListError: null,
        userPlayLists: [...state.userPlayLists, action.payload],
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_CREATE_RESET: {
      return {
        ...state,
        isCreatingPlayList: false,
        createPlayListSuccess: false,
        createPlayListError: null,
        isEditPlayList: false,
        editPlayListError: null,
        editPlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_GET_REQUEST: {
      return {
        ...state,
        isGettingUserPlayList: true,
        getUserPlayListError: null,
        getUserPlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_GET_ERROR: {
      return {
        ...state,
        isGettingUserPlayList: false,
        getUserPlayListError: action.payload,
        getUserPlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_GET_SUCCESS: {
      return {
        ...state,
        isGettingUserPlayList: false,
        getUserPlayListError: null,
        getUserPlayListSuccess: true,
        userPlayLists: [...action.payload],
      };
    }
    case LibraryPlayListTypes.PLAYLIST_GET_REQUEST: {
      return {
        ...state,
        isGettingPlayList: true,
        getPlayListError: null,
        getPlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.PLAYLIST_GET_ERROR: {
      return {
        ...state,
        isGettingPlayList: false,
        getPlayListError: action.payload,
        getPlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.PLAYLIST_GET_SUCCESS: {
      return {
        ...state,
        isGettingPlayList: false,
        getPlayListError: null,
        getPlayListSuccess: true,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_SET_CURRENT_PATH: {
      return {
        ...state,
        currentPath: action.payload,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_DELETE_REQUEST: {
      return {
        ...state,
        isDeleltePlayList: true,
        deleltePlayListError: null,
        deleltePlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_DELETE_ERROR: {
      return {
        ...state,
        isDeleltePlayList: false,
        deleltePlayListError: action.payload,
        deleltePlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_DELETE_SUCCESS: {
      const newUserPlayLists = toggleInArrayById(
        state.userPlayLists,
        action.payload,
      );
      return {
        ...state,
        isDeleltePlayList: false,
        deleltePlayListError: null,
        deleltePlayListSuccess: true,
        userPlayLists: [...newUserPlayLists],
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_FOLLOW_REQUEST: {
      return {
        ...state,
        isLikePlayList: true,
        likePlayListError: null,
        likePlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_FOLLOW_ERROR: {
      return {
        ...state,
        isLikePlayList: false,
        likePlayListError: action.payload,
        likePlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_FOLLOW_SUCCESS: {
      return {
        ...state,
        isLikePlayList: false,
        likePlayListError: null,
        likePlayListSuccess: true,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_SYNC_FOLLOW: {
      const newUserPlayLists = toggleInArrayById(
        state.userPlayList,
        action.payload,
      );
      return {
        ...state,
        userPlayLists: [...newUserPlayLists],
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_EDIT_REQUEST: {
      return {
        ...state,
        isEditPlayList: true,
        editPlayListError: null,
        editPlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_EDIT_ERROR: {
      return {
        ...state,
        isEditPlayList: false,
        editPlayListSuccess: false,
        editPlayListError: action.payload,
      };
    }
    case LibraryPlayListTypes.USER_PLAYLIST_EDIT_SUCCESS: {
      return {
        ...state,
        isEditPlayList: false,
        editPlayListError: null,
        editPlayListSuccess: true,
      };
    }
    case LibraryPlayListTypes.ADD_SONG_TO_PLAYLIST_REQUEST: {
      return {
        ...state,
        isAddSongToPlayList: true,
        addSongToPlayListError: null,
        addSongToPlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.ADD_SONG_TO_PLAYLIST_SUCCESS: {
      return {
        ...state,
        isEditisAddSongToPlayListPlayList: false,
        addSongToPlayListError: action.payload,
        addSongToPlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.ADD_SONG_TO_PLAYLIST_ERROR: {
      return {
        ...state,
        isAddSongToPlayList: false,
        addSongToPlayListError: null,
        addSongToPlayListSuccess: true,
      };
    }
    case LibraryPlayListTypes.REMOVE_SONG_FROM_PLAYLIST_REQUEST: {
      return {
        ...state,
        isRemoveSongFromPlayList: true,
        removeSongFromPlayListError: null,
        removeSongFromPlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.REMOVE_SONG_FROM_PLAYLIST_SUCCESS: {
      return {
        ...state,
        isRemoveSongFromPlayList: false,
        removeSongFromPlayListError: action.payload,
        removeSongFromPlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.REMOVE_SONG_FROM_PLAYLIST_ERROR: {
      return {
        ...state,
        isRemoveSongFromPlayList: false,
        removeSongFromPlayListError: null,
        removeSongFromPlayListSuccess: true,
      };
    }
    case LibraryPlayListTypes.UPDATE_ORDER_PLAYLIST_REQUEST: {
      return {
        ...state,
        isUpdateOrderPlayList: true,
        updateOrderPlayListError: null,
        updateOrderPlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.UPDATE_ORDER_PLAYLIST_ERROR: {
      return {
        ...state,
        isUpdateOrderPlayList: false,
        updateOrderPlayListError: action.payload,
        updateOrderPlayListSuccess: false,
      };
    }
    case LibraryPlayListTypes.UPDATE_ORDER_PLAYLIST_SUCCESS: {
      return {
        ...state,
        isUpdateOrderPlayList: false,
        updateOrderPlayListError: null,
        updateOrderPlayListSuccess: true,
      };
    }
    default:
      return state;
  }
};
export default LibraryPlayListReducer;
