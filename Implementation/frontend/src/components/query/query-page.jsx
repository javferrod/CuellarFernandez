import React from 'react';
import { connect } from 'react-redux';
import { search } from '../../actions/query';
import { CollectiveInfo } from '../data-display';
import Filters from './filters';
import { marginTop32 } from '../common/styles';

const QueryPage = (props) => {
  const { onSearch, data } = props;
  return (
    <div>
      <Filters className={marginTop32} onSearch={onSearch} />
      <CollectiveInfo data={data} />
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.query.data,
  loading: state.query.loading,
  error: state.query.error,
  empty: state.query.empty,
});

const mapDispatchToProps = dispatch => ({
  onSearch: filters => dispatch(search(filters)),
});


export default connect(mapStateToProps, mapDispatchToProps)(QueryPage);
