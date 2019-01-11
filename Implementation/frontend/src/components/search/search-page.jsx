import React from 'react';
import { connect } from 'react-redux';
import { marginTop32, boxContainer } from '../common/styles';
import { IndividualInfo } from '../data-display';
import { search } from '../../actions/search';
import SearchBox from './search-box';

const R = require('ramda');


const SearchPage = (props) => {
  const {
    data, onSearch, loading, error, empty, codices, token,
  } = props;

  return (
    <div className={marginTop32}>
      <div className={boxContainer}>

        <SearchBox
          loading={loading}
          error={error}
          empty={empty}
          onSearch={onSearch(token)}
          codices={codices}
        />
      </div>

      <IndividualInfo {...data} />

    </div>
  );
};

const mapStateToProps = state => ({
  data: state.search.data,
  loading: state.search.loading,
  error: state.search.error,
  empty: state.search.empty,
  codices: adequate(state.permissions.list),
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  onSearch: token => codice => dispatch(search(token, codice)),
});

const adequate = R.map(R.prop('codice'));

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
