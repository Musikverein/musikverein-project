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

  getSongs: (headers, body = {}) => {
    return axios.post(`${baseURL}/songs`, body, {
      headers: headers,
    });
  },
  likeSong: (headers, body = {}) => {
    return axios.post(`${baseURL}/songs/like`, body, {
      headers: headers,
    });
  },
};
