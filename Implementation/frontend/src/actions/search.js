import axios from 'axios';

const R = require('ramda');

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_LOADING = 'SEARCH_LOADING';
export const SEARCH_EMPTY = 'SEARCH_EMPTY';


export function search(id, codice) {
  return async (dispatch) => {
    dispatch(loading());
    let json;

    try {
      json = await axios.post('http://localhost:8080/query/codice', { id, codice });
    } catch (error) {
      handleError(error, dispatch);
      return;
    }

    dispatch(searchResponse(json.data));
  };
}

export function searchResponse(rawData) {
  return {
    type: SEARCH_SUCCESS,
    data: rawData, // refactor?
  };
}

export function searchError() {
  return { type: SEARCH_ERROR };
}

export function searchEmpty() {
  return { type: SEARCH_EMPTY };
}

export function loading() {
  return { type: SEARCH_LOADING };
}

function handleError(error, dispatch) {
  const { status } = error.response;

  if (status === 403) { dispatch(searchEmpty()); } else { dispatch(searchError()); }
}
