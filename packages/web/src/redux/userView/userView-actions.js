import { toast } from 'react-toastify';
import api from '../../api';
import * as auth from '../../services/auth';
import * as UserViewTypes from './userView-types';
import { signOutSuccess } from '../auth/auth-actions';
import {
  normalizePlayLists,
  normalizeSongs,
  normalizeUsers,
} from '../../utils/normalizrSchema/schema';
import { loadUsers } from '../user/user-actions';
import { loadSongs } from '../song/song-actions';
import { loadPlayList } from '../playList/playList-actions';
import { imageUpload } from '../../services/cloudinary';

export const getUserViewRequest = () => ({
  type: UserViewTypes.USER_VIEW_GET_REQUEST,
});
export const getUserViewSuccess = () => ({
  type: UserViewTypes.USER_VIEW_GET_SUCCESS,
});
export const getUserViewError = (message) => ({
  type: UserViewTypes.USER_VIEW_GET_ERROR,
  payload: message,
});

export const getUserView = ({ userId }) => {
  return async function getUserViewThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getUserViewRequest());
    try {
      const { errorMessage, data: response } = await api.getUserView(
        { Authorization: `Bearer ${token}` },
        { userId },
      );
      if (errorMessage || response.error) {
        return dispatch(getUserViewError(errorMessage || response.error));
      }
      const { entities } = normalizeUsers([response.data]);
      dispatch(loadUsers(entities.users));
      return dispatch(getUserViewRequest());
    } catch (error) {
      return dispatch(getUserViewError(error.message));
    }
  };
};

export const getUserViewSongsRequest = () => ({
  type: UserViewTypes.USER_VIEW_GET_SONGS_REQUEST,
});
export const getUserViewSongsSuccess = (songs) => ({
  type: UserViewTypes.USER_VIEW_GET_SONGS_SUCCESS,
  payload: songs,
});
export const getUserViewSongsError = (message) => ({
  type: UserViewTypes.USER_VIEW_GET_SONGS_ERROR,
  payload: message,
});

export const getUserViewSongs = ({ userId }) => {
  return async function getUserViewSongsThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getUserViewSongsRequest());
    try {
      const { errorMessage, data: response } = await api.getUserViewSongs(
        { Authorization: `Bearer ${token}` },
        { userId },
      );
      if (errorMessage || response.error) {
        return dispatch(getUserViewSongsError(errorMessage || response.error));
      }
      const { entities, result } = normalizeSongs(response.data);
      dispatch(loadSongs(entities.songs));
      return dispatch(getUserViewSongsSuccess(result));
    } catch (error) {
      return dispatch(getUserViewSongsError(error.message));
    }
  };
};

export const getUserViewPlayListsRequest = () => ({
  type: UserViewTypes.USER_VIEW_GET_PLAYLISTS_REQUEST,
});
export const getUserViewPlayListsSuccess = (playlists) => ({
  type: UserViewTypes.USER_VIEW_GET_PLAYLISTS_SUCCESS,
  payload: playlists,
});
export const getUserViewPlayListsError = (message) => ({
  type: UserViewTypes.USER_VIEW_GET_PLAYLISTS_ERROR,
  payload: message,
});

export const getUserViewPlayLists = ({ userId }) => {
  return async function getUserViewPlayListsThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getUserViewPlayListsRequest());
    try {
      const { errorMessage, data: response } = await api.getUserViewPlayLists(
        { Authorization: `Bearer ${token}` },
        { userId },
      );
      if (errorMessage || response.error) {
        return dispatch(
          getUserViewPlayListsError(errorMessage || response.error),
        );
      }
      const { entities, result } = normalizePlayLists(response.data);
      dispatch(loadPlayList(entities.playLists));
      return dispatch(getUserViewPlayListsSuccess(result));
    } catch (error) {
      return dispatch(getUserViewPlayListsError(error.message));
    }
  };
};

export const getUserViewFollowedRequest = () => ({
  type: UserViewTypes.USER_VIEW_GET_FOLLOWEDBY_REQUEST,
});
export const getUserViewFollowedSuccess = () => ({
  type: UserViewTypes.USER_VIEW_GET_FOLLOWEDBY_SUCCESS,
});
export const getUserViewFollowedError = (message) => ({
  type: UserViewTypes.USER_VIEW_GET_FOLLOWEDBY_ERROR,
  payload: message,
});

export const getUserViewFollowed = ({ userId }) => {
  return async function getUserViewThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getUserViewFollowedRequest());
    try {
      const { errorMessage, data: response } = await api.getUserViewFollowed(
        { Authorization: `Bearer ${token}` },
        { userId },
      );
      if (errorMessage || response.error) {
        return dispatch(
          getUserViewFollowedError(errorMessage || response.error),
        );
      }
      const { entities, result } = normalizeUsers(response.data.followedBy);
      dispatch(loadUsers(entities.users));
      dispatch(
        loadUsers({
          [response.data._id]: { ...response.data, followedBy: result },
        }),
      );
      return dispatch(getUserViewFollowedSuccess());
    } catch (error) {
      return dispatch(getUserViewFollowedError(error.message));
    }
  };
};

export const getUserViewFollowingRequest = () => ({
  type: UserViewTypes.USER_VIEW_GET_FOLLOWING_REQUEST,
});
export const getUserViewFollowingSuccess = () => ({
  type: UserViewTypes.USER_VIEW_GET_FOLLOWING_SUCCESS,
});
export const getUserViewFollowingError = (message) => ({
  type: UserViewTypes.USER_VIEW_GET_FOLLOWING_ERROR,
  payload: message,
});

export const getUserViewFollowing = ({ userId }) => {
  return async function getUserViewThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getUserViewFollowingRequest());
    try {
      const { errorMessage, data: response } = await api.getUserViewFollowing(
        { Authorization: `Bearer ${token}` },
        { userId },
      );
      if (errorMessage || response.error) {
        return dispatch(
          getUserViewFollowingError(errorMessage || response.error),
        );
      }
      const { entities, result } = normalizeUsers(response.data.following);
      dispatch(loadUsers(entities.users));
      dispatch(
        loadUsers({
          [response.data._id]: { ...response.data, following: result },
        }),
      );
      return dispatch(getUserViewFollowingSuccess());
    } catch (error) {
      return dispatch(getUserViewFollowingError(error.message));
    }
  };
};

export const followUserRequest = () => ({
  type: UserViewTypes.FOLLOW_USER_REQUEST,
});
export const followUserSuccess = () => ({
  type: UserViewTypes.FOLLOW_USER_SUCCESS,
});
export const followUserError = (message) => ({
  type: UserViewTypes.FOLLOW_USER_ERROR,
  payload: message,
});

export const followUser = ({ userId }) => {
  return async function getUserViewThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(followUserRequest());
    try {
      const { errorMessage, data: response } = await api.followUser(
        { Authorization: `Bearer ${token}` },
        { userId },
      );
      if (errorMessage || response.error) {
        toast.error('🔥 Something went wrong!');
        return dispatch(followUserError(errorMessage || response.error));
      }
      const { entities } = normalizeUsers([response.data]);
      dispatch(loadUsers(entities.users));
      return dispatch(followUserSuccess());
    } catch (error) {
      return dispatch(followUserError(error.message));
    }
  };
};

export const updateProfile = ({
  userName,
  firstName,
  lastName,
  file,
  recaptchaToken,
}) => {
  return async function updateProfileThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(updateProfileRequest());
    try {
      let image = null;

      if (file) {
        const fileUrl = await imageUpload(
          file,
          process.env.REACT_APP_CLOUDINARY_PRESET_PROFILE_IMG,
        );
        image = fileUrl;
      }

      const { errorMessage, data: response } = await api.updateProfile(
        {
          Authorization: `Bearer ${token}`,
        },
        { userName, firstName, lastName, image, recaptchaToken },
      );
      if (errorMessage || response.error) {
        toast.error('🔥 Something went wrong!');
        return dispatch(updateProfileError(errorMessage || response.error));
      }
      const { entities } = normalizeUsers([response.data]);
      dispatch(loadUsers(entities.users));

      toast.dark('✌ Update Correctly!');
      return dispatch(updateProfileSuccess());
    } catch (error) {
      return dispatch(updateProfileError(error.message));
    }
  };
};

export const updateProfileRequest = () => ({
  type: UserViewTypes.USER_VIEW_EDIT_REQUEST,
});

export const updateProfileError = (errorMessage) => ({
  type: UserViewTypes.USER_VIEW_EDIT_ERROR,
  payload: errorMessage,
});

export const updateProfileSuccess = () => ({
  type: UserViewTypes.USER_VIEW_EDIT_SUCCESS,
});

export const resetUpdate = () => ({
  type: UserViewTypes.USER_VIEW_EDIT_RESET,
});
