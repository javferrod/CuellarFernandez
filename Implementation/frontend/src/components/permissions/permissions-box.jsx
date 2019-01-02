import React from 'react';
import { Input, Icon } from 'antd';
import { height32 } from '../common/styles';

const PermissionBox = (props) => {
  const { error, onRequest } = props;

  return (
    <Input
      className={height32}
      placeholder="Codice fiscale"
      suffix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
      onPressEnter={e => onRequest(e.target.value)}
    />
  );
};

export default PermissionBox;
