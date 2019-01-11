import axios from 'axios';

const R = require('ramda');

export const PERMISSIONS_LOADING = 'PERMISSIONS_LOADING';
export const PERMISSIONS_ERROR = 'PERMISSIONS_ERROR';
export const PERMISSIONS_SUCCESS = 'PERMISSIONS_SUCCESS';
export const PERMISSIONS_EMPY = 'PERMISSIONS_EMPY';
export const PERMISSION_REQUEST_OK = 'PERMISSION_REQUEST_OK';


export function getPermissions(token) {
  return async (dispatch) => {
    dispatch(loading());
    let json;

    try {
      json = await axios.post('http://localhost:8080/permissions', { token });
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

export function requestPermission(token, codice) {
  return async (dispatch) => {
    dispatch(loading());
    let json;

    try {
      json = await axios.post('http://localhost:8080/permissions/request', { token, codice });
    } catch (error) {
      dispatch(permissionsError());
      return;
    }

    if (R.isEmpty(json.data)) {
      dispatch(permissionsEmpty());
    } else {
      dispatch(permissionRequestResponse(codice));
    }
  };
}


export function permissionsResponse(rawData) {
  return {
    type: PERMISSIONS_SUCCESS,
    data: arrayWrap(rawData),
  };
}

export function permissionRequestResponse(codice) {
  return {
    type: PERMISSION_REQUEST_OK,
    data: { codice, accepted: false },
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
