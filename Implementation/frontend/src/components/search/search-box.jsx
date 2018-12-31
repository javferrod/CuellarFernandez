import React from 'react';
import { Form, Input } from 'antd';
import { height32 } from '../common/styles';

const { Search } = Input;

const SearchBox = props => (
  <Form>
    <Form.Item
      hasFeedback
      {...getValidateStatus(props)}
    >
      <Search className={height32} placeholder="Codice fiscale" onSearch={props.onSearch}/>
    </Form.Item>
  </Form>
);

const getValidateStatus = (props) => {
  if (props.loading) {
    return {
      validateStatus: 'validating',
      help: 'Loading...',
    };
  }
  if (props.error) {
    return {
      validateStatus: 'warning',
      help: 'You do not have permission to access the user',
    };
  }

  return {};
};

export default SearchBox;
