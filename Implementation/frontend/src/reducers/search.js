import {
  SEARCH_LOADING, SEARCH_ERROR, SEARCH_SUCCESS, SEARCH_EMPTY,
} from '../actions/search';

const R = require('ramda');

const initialState = {
  loading: false,
  empty: false,
  error: false,
  individualData: {},
  collectiveData: {},
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return {
        ...state, ...mapData(action.data), loading: false, empty: false,
      };
    case SEARCH_EMPTY:
      return {
        ...state, empty: true, loading: false, error: false,
      };
    case SEARCH_ERROR:
      return {
        ...state, error: true, loading: false, empty: false,
      };
    case SEARCH_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}

const mapData = data => ({
  individualData: R.pick(['name', 'surname', 'codice', 'genre', 'residence', 'weight', 'hearthrate', 'location'], data),
  collectiveData: R.pick(['location'], data),
});
