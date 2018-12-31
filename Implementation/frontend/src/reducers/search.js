import R from 'ramda';
import { SEARCH_LOADING, SEARCH_ERROR, SEARCH_SUCCESS } from '../actions/search';

const initialState = {
  loading: false,
  error: false,
  individualData: {},
  collectiveData: {},
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return { ...state, ...mapData(action.data), loading: false };
    case SEARCH_ERROR:
      return { ...state, error: true, loading: false };
    case SEARCH_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}

const mapData = data => ({
  individualData: R.pick(['name', 'surname', 'codice', 'genre', 'residence'], data),
  collectiveData: R.pick(['location'], data),
});
