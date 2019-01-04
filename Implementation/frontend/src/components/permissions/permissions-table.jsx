import React from 'react';
import { Table, Icon } from 'antd';
import { css } from 'emotion';

const centeredIcon = css`
  display: block;
  margin: 0 auto;
`;

const columns = [{
  title: 'Codice Fiscale',
  dataIndex: 'codice',
  key: 'codice',
}, {
  title: '',
  dataIndex: 'status',
  key: 'status',
  render: status => {
    if(status)
      return <Icon className={centeredIcon} type="check-circle" />
    else
      return  <Icon className={centeredIcon} type="check-circle" />
  },
}];


const PermissionTable = (props) => {
  const { permissions, empty } = props;

  if (empty) { return <div>empty</div>; }

  return (<Table dataSource={permissions} columns={columns} pagination={false}/>);
};


export default PermissionTable;
