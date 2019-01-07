import axios from 'axios';

const R = require('ramda');

export const QUERY_SUCCESS = 'QUERY_SUCCESS';
export const QUERY_ERROR = 'QUERY_ERROR';
export const QUERY_LOADING = 'QUERY_LOADING';
export const QUERY_EMPTY = 'QUERY_EMPTY';


export function search(id, codice) {
  return async (dispatch) => {
    dispatch(loading());
    let json;

    try {
      json = await axios.post('http://localhost:8080/query/', { id, codice });
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

export function queryEmpty() {
  return { type: QUERY_EMPTY };
}

export function loading() {
  return { type: QUERY_LOADING };
}

function handleError(error, dispatch) {
  const { status } = error.response;

  if (status === 403) { dispatch(queryEmpty()); } else { dispatch(queryError()); }
}
