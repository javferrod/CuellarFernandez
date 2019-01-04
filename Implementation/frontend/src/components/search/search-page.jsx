import React from 'react';
import { connect } from 'react-redux';
import { marginTop32, boxContainer } from '../common/styles';
import { IndividualInfo } from '../data-display';
import { search } from '../../actions/search';
import SearchBox from './search-box';

const R = require('ramda');


const SearchPage = (props) => {
  const {
    individualData, onSearch, loading, error, empty, codices,
  } = props;

  return (
    <div className={marginTop32}>
      <div className={boxContainer}>

        <SearchBox
          loading={loading}
          error={error}
          empty={empty}
          onSearch={onSearch}
          codices={codices}
        />
      </div>

      <IndividualInfo {...individualData} />

    </div>
  );
};

const mapStateToProps = state => ({
  individualData: state.search.individualData,
  loading: state.search.loading,
  error: state.search.error,
  empty: state.search.empty,
  codices: adequate(state.permissions.list),
});

const mapDispatchToProps = dispatch => ({
  onSearch: codice => dispatch(search(1, codice)),
});

const adequate = R.map(R.prop('codice'));

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
