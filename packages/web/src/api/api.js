import { makeRequest } from './api-utils';

function makeApi(request = makeRequest()) {
  function signUp(headers) {
    return request({
      url: '/user/sign-up',
      requestMethod: 'POST',
      headers: headers,
    });
  }

  function signOut(headers) {
    return request({
      url: '/user/sign-out',
      requestMethod: 'POST',
      headers: headers,
    });
  }

  function updateProfile(headers, body) {
    return request({
      url: '/user/update',
      requestMethod: 'PATCH',
      headers: headers,
      body: body,
    });
  }
  return {
    signUp: signUp,
    signOut: signOut,
    updateProfile: updateProfile,
  };
}

export default makeApi();
