import React from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import { getPermissions, requestPermission } from '../../actions/permissions';
import PermissionTable from './permissions-table';
import PermissionBox from './permissions-box';
import { boxContainer, marginTop32 } from '../common/styles';

const tableStyle = css`
  max-width:800px;
  margin:32px auto;
`;

class PermissionsPage extends React.Component {
  componentDidMount() {
    this.props.getPermissions(1);
  }

  render() {
    const { permissions, empty, requestPermission } = this.props;
    return (
      <div className={marginTop32}>
        <div className={boxContainer}>
          <PermissionBox onRequest={requestPermission} />
        </div>
        <div className={tableStyle}>
          <PermissionTable permissions={permissions} empty={empty} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  permissions: state.permissions.list,
  loading: state.search.loading,
  error: state.search.error,
  empty: state.search.empty,
});

const mapDispatchToProps = dispatch => ({
  getPermissions: id => dispatch(getPermissions(id)),
  requestPermission: codice => dispatch(requestPermission(1, codice)),
});


export default connect(mapStateToProps, mapDispatchToProps)(PermissionsPage);
