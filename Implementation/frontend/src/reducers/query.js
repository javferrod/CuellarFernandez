import moment from 'moment';
import {
  QUERY_SUCCESS, QUERY_FORBIDDEN, QUERY_ERROR, QUERY_LOADING,
} from '../actions/query';

const R = require('ramda');

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
        ...state, data: process(action.data), loading: false, forbidden: false,
      };
    case QUERY_FORBIDDEN:
      return {
        ...state, forbidden: true, loading: false, error: false,
      };
    case QUERY_ERROR:
      return {
        ...state, error: true, loading: false, forbidden: false,
      };
    case QUERY_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}

const process = data => ({ ...data, age: getAges(data.birthdate) });

const getAges = R.map(R.pipe(
  R.prop('birthdate'),
  birthdate => moment(birthdate),
  age => ({ age: moment().diff(age, 'years') }),
));
