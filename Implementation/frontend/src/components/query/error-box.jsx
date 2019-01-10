import React from 'react';
import { Alert } from 'antd';
import { marginTop32 } from '../common/styles';

const ErrorBox = (props) => {
  const { error, forbidden } = props;

  if (error || forbidden) {
    return (
      <Alert
        className={marginTop32}
        message={getMessage(error, forbidden)}
        type={getType(error, forbidden)}
      />
    );
  } return <div />;
};

export default ErrorBox;

const getType = (error, forbidden) => {
  if (error) { return 'error'; }
  if (forbidden) { return 'warning'; }
};


const getMessage = (error, forbidden) => {
  if (error) { return 'The query is invalid'; }
  if (forbidden) { return 'The query is too specific.'; }
};
