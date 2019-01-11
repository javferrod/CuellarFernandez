import moment from 'moment';
import {
  SEARCH_LOADING, SEARCH_ERROR, SEARCH_SUCCESS, SEARCH_EMPTY,
} from '../actions/search';

const initialState = {
  loading: false,
  empty: false,
  error: false,
  data: {},
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return {
        ...state, data: adequate(action.data), loading: false, empty: false,
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

const adequate = data => ({
  ...data,
  birthdate: moment(data.birthdate).format('YYYY-MM-DD'),
});
