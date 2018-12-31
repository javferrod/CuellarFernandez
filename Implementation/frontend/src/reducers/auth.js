import { LOGIN_OK, LOGIN_LOADING } from '../actions/auth';

const initialState = {
  token: null,
  loading: false,

};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING:
      return { ...state, loading: true };
    case LOGIN_OK:
      return { ...state, token: action.token, loading: false };
    default:
      return state;
  }
}
