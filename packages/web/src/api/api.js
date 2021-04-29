import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const api = {
  signUp: (headers, body = {}) => {
    return axios.post(`${baseURL}/user/sign-up`, body, {
      headers: headers,
    });
  },

  signOut: (headers, body = {}) => {
    return axios.post(`${baseURL}/user/sign-out`, body, {
      headers: headers,
    });
  },

  updateProfile: (headers, body = {}) => {
    return axios.patch(`${baseURL}/user/update`, body, {
      headers: headers,
    });
  },

  verifyRecaptchaToken: (recaptchaToken) => {
    return axios.post(`${baseURL}/recaptcha`, { recaptchaToken }, {});
  },

  uploadSong: (headers, body = {}) => {
    return axios.post(`${baseURL}/songs/upload`, body, {
      headers: headers,
    });
  },

  getUserSongs: (headers, body = {}) => {
    return axios.post(`${baseURL}/songs/userSongs`, body, {
      headers: headers,
    });
  },

  getLikedSongs: (headers, body = {}) => {
    return axios.post(`${baseURL}/songs/userSongs/liked`, body, {
      headers: headers,
    });
  },

  likeSong: (headers, body = {}) => {
    return axios.patch(`${baseURL}/songs/like`, body, {
      headers: headers,
    });
  },

  deleteSong: (headers, body = {}) => {
    return axios.delete(`${baseURL}/songs/delete`, {
      headers: headers,
      data: body,
    });
  },

  editSong: (headers, body = {}) => {
    return axios.patch(`${baseURL}/songs/edit`, body, {
      headers: headers,
    });
  },

  createPlayList: (headers, body = {}) => {
    return axios.post(`${baseURL}/playlist/create`, body, {
      headers: headers,
    });
  },

  getUserPlayLists: (headers, body = {}) => {
    return axios.post(`${baseURL}/playlist/userPlaylists`, body, {
      headers: headers,
    });
  },

  getFollowedPlayLists: (headers, body = {}) => {
    return axios.post(`${baseURL}/playlist/userPlaylists/follow`, body, {
      headers: headers,
    });
  },

  deletePlayList: (headers, body = {}) => {
    return axios.delete(`${baseURL}/playlist/userPlaylists/delete`, {
      headers: headers,
      data: body,
    });
  },

  followPlayList: (headers, body = {}) => {
    return axios.patch(`${baseURL}/playlist/follow`, body, {
      headers: headers,
    });
  },

  editPlayList: (headers, body = {}) => {
    return axios.patch(`${baseURL}/playlist/edit`, body, {
      headers: headers,
    });
  },
};
