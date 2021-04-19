import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const api = {
  signUp: (headers) => {
    return axios.post(
      `${baseURL}/user/sign-up`,
      {},
      {
        headers: headers,
      },
    );
  },

  signOut: (headers) => {
    return axios.post(
      `${baseURL}/user/sign-out`,
      {},
      {
        headers: headers,
      },
    );
  },

  updateProfile: (headers, body) => {
    return axios.patch(`${baseURL}/user/update`, body, {
      headers: headers,
    });
  },

  verifyRecaptchaToken: (recaptchaToken) => {
    return axios.post(`${baseURL}/recaptcha`, { recaptchaToken }, {});
  },
};
