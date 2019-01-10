import axios from 'axios';

const R = require('ramda');

export const PERMISSIONS_LOADING = 'PERMISSIONS_LOADING';
export const PERMISSIONS_ERROR = 'PERMISSIONS_ERROR';
export const PERMISSIONS_SUCCESS = 'PERMISSIONS_SUCCESS';
export const PERMISSIONS_EMPY = 'PERMISSIONS_EMPY';


export function getPermissions(id) {
  return async (dispatch) => {
    dispatch(loading());
    let json;

    try {
      json = await axios.post('http://localhost:8080/permissions', { id });
    } catch (error) {
      dispatch(permissionsError());
      return;
    }

    if (R.isEmpty(json.data)) {
      dispatch(permissionsEmpty());
    } else {
      dispatch(permissionsResponse(json.data));
    }
  };
}

export function requestPermission(id, codice) {
  return async (dispatch) => {
    dispatch(loading());
    let json;

    try {
      json = await axios.post('http://localhost:8080/permissions/request', { id, codice });
    } catch (error) {
      dispatch(permissionsError());
      return;
    }

    if (R.isEmpty(json.data)) {
      dispatch(permissionsEmpty());
    } else {
      dispatch(permissionsResponse(json.data));
    }
  };
}


export function permissionsResponse(rawData) {
  return {
    type: PERMISSIONS_SUCCESS,
    data: arrayWrap(rawData),
  };
}

export function permissionsError() {
  return { type: PERMISSIONS_ERROR };
}

export function permissionsEmpty() {
  return { type: PERMISSIONS_EMPY };
}

export function loading() {
  return { type: PERMISSIONS_LOADING };
}


const arrayWrap = R.unless(
  R.is(Array),
  data => [data],
);
