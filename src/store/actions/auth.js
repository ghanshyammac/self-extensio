export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export const setAccessToken = (data) => {
  return {
    type: SET_ACCESS_TOKEN,
    payload: data,
  };
};
