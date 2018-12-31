import React from 'react';
import { css } from 'emotion';
import { connect } from 'react-redux';
import { marginTop32 } from '../common/styles';
import { IndividualInfo, CollectiveInfo } from '../data-display';
import { search } from '../../actions/search';
import SearchBox from './search-box';

const searchBoxContainer = css`
  margin:0 auto;
  max-width:300px;
`;


const SearchPage = (props) => {
  const {
    individualData, collectiveData, onSearch, loading, error, empty,
  } = props;

  return (
    <div className={marginTop32}>
      <div className={searchBoxContainer}>
        <SearchBox loading={loading} error={error} empty={empty} onSearch={onSearch} />
      </div>

      <IndividualInfo {...individualData} />
      <CollectiveInfo {...collectiveData} />

    </div>
  );
};

const mapStateToProps = state => ({
  individualData: state.search.individualData,
  collectiveData: state.search.collectiveData,
  loading: state.search.loading,
  error: state.search.error,
  empty: state.search.empty,
});

const mapDispatchToProps = dispatch => ({
  onSearch: codice => dispatch(search(codice)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
