import {
  QUERY_SUCCESS, QUERY_EMPTY, QUERY_ERROR, QUERY_LOADING,
} from '../actions/query';

const initialState = {
  loading: false,
  empty: false,
  error: false,
  data: {},
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case QUERY_SUCCESS:
      return {
        ...state, data: action.data, loading: false, empty: false,
      };
    case QUERY_EMPTY:
      return {
        ...state, empty: true, loading: false, error: false,
      };
    case QUERY_ERROR:
      return {
        ...state, error: true, loading: false, empty: false,
      };
    case QUERY_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}
