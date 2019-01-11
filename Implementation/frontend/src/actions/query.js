import axios from 'axios';

const R = require('ramda');

export const QUERY_SUCCESS = 'QUERY_SUCCESS';
export const QUERY_ERROR = 'QUERY_ERROR';
export const QUERY_LOADING = 'QUERY_LOADING';
export const QUERY_FORBIDDEN = 'QUERY_FORBIDDEN';


export function search(token, query) {
  return async (dispatch) => {
    dispatch(loading());
    let json;

    try {
      json = await axios.post('http://localhost:8080/query/', { token, query });
    } catch (error) {
      handleError(error, dispatch);
      return;
    }

    dispatch(searchResponse(json.data));
  };
}

export function searchResponse(rawData) {
  return {
    type: QUERY_SUCCESS,
    data: rawData, // refactor?
  };
}

export function queryError() {
  return { type: QUERY_ERROR };
}

export function queryForbidden() {
  return { type: QUERY_FORBIDDEN };
}

export function loading() {
  return { type: QUERY_LOADING };
}

function handleError(error, dispatch) {
  const { status } = error.response;

  if (status === 403) { dispatch(queryForbidden()); } else { dispatch(queryError()); }
}
