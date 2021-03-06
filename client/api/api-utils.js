import axios from "axios";

export function createDefaultResponse() {
  return {
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
  baseURL = "http://localhost:4000",
  baseHeaders = {
    Accept: "application/json",
  }
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
        }
      })
    );
  };
}
