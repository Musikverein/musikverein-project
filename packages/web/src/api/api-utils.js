import axios from "axios";

export function createDefaultResponse() {
  return {
    isSuccessful: false,
    data: null,
    errorMessage: null,
  };
}

export async function normalizeResponse(promise = Promise.resolve) {
  const defaultResponse = createDefaultResponse();
  let networkResponse = null;

  try {
    networkResponse = await promise;
    defaultResponse.data = networkResponse.data;
  } catch (error) {
    defaultResponse.errorMessage = error.message;
  }

  return defaultResponse;
}

export function makeRequest(
  httpClient = axios,
  baseURL = process.env.REACT_APP_API_BASE_URL,
  baseHeaders = {
    Accept: "application/json",
  },
) {
  return async function request({
    url = "/",
    requestMethod = "GET",
    body = {},
    headers = {},
  }) {
    return normalizeResponse(
      httpClient({
        url: baseURL + url,
        method: requestMethod,
        data: body,
        headers: {
          ...baseHeaders,
          ...headers,
        },
        validateStatus: function validateStatus(status) {
          // Resolve only if the status code is in the 200 range
          return status >= 200 && status < 400;
        },
      }),
    );
  };
}
