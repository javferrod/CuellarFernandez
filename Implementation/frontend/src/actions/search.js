import axios from 'axios';

const R = require('ramda');

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_LOADING = 'SEARCH_LOADING';


export function search(codice) {
  return async (dispatch) => {
    dispatch(loading());

    const json = await axios.post('http://localhost:8080/query/codice', { codice });

    if (R.isEmpty(json.data)) {
      dispatch(searchError());
    } else {
      dispatch(searchResponse(json.data));
    }
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

export function loading() {
  return { type: SEARCH_LOADING };
}
