import { mock } from './mock';

const axios = require('axios');

const instance = axios.create({
  timeout: 120000,
  withCredentials: false,
});

instance.defaults.baseURL = 'http://localhost:6660/';

export const request = async ({
  isMock,
  url,
  destiny,
  method,
  headers = undefined,
  queryParams = {},
  body,
  ...other
}) => {
  Object.keys(queryParams).forEach(
    (key) => queryParams.hasOwnProperty(key)
      && !queryParams[key]
      && queryParams[key] !== false
      && delete queryParams[key],
  );

  if (isMock) {
    console.log({
      url,
      method,
      queryParams,
      body,
      headers,
    });
    return mock(other.mockResult);
  }
  return instance.request({
    url,
    method,
    headers,
    ...other,
    params: queryParams,
    data: body,
  });
};

export default instance;

export const handleApiErrors = (response) => response;
