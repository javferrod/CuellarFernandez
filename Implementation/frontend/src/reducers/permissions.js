import {
  PERMISSIONS_SUCCESS, PERMISSIONS_EMPY, PERMISSIONS_LOADING, PERMISSIONS_ERROR,
} from '../actions/permissions';

const R = require('ramda');

const initialState = {
  loading: false,
  empty: true,
  error: false,
  list: [],
};

export default function permissions(state = initialState, action) {
  switch (action.type) {
    case PERMISSIONS_SUCCESS:
      return {
        ...state, list: action.data, loading: false, empty: false,
      };
    case PERMISSIONS_EMPY:
      return {
        ...state, empty: true, loading: false, error: false,
      };
    case PERMISSIONS_ERROR:
      return {
        ...state, error: true, loading: false, empty: false,
      };
    case PERMISSIONS_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}
