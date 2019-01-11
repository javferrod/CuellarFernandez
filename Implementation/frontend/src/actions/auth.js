import axios from 'axios';

export const LOGIN_OK = 'LOGIN_OK';
export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_NOT_OK = 'LOGIN_NOT_OK';


export function login(username, password) {
  const credentials = { user: username, password };

  return async (dispatch) => {
    dispatch(loading());

    const json = await axios.post('http://localhost:8080/auth/login', credentials);

    dispatch(loginResponse(json.data));
  };
}

export function loginResponse(response) {
  const { token } = response;

  if (token) { return { type: LOGIN_OK, token }; }
  return { type: LOGIN_NOT_OK };
}

export function loading() {
  return { type: LOGIN_LOADING };
}
