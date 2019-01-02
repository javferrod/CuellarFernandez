import React from 'react';
import {
  Form, Input, AutoComplete, Icon,
} from 'antd';
import { height32 } from '../common/styles';

const { Search } = Input;

const SearchBox = (props) => {
  const { onSearch, codices } = props;
  return (
    <Form>
      <Form.Item
        hasFeedback
        {...getValidateStatus(props)}
      >
        <AutoComplete
          dataSource={codices}
          className={height32}
          onSelect={onSearch}
          placeholder="Codice fiscale"
        >
          <Search className={height32} placeholder="Codice fiscale" />
        </AutoComplete>
      </Form.Item>
    </Form>
  );
};

const getValidateStatus = (props) => {
  if (props.loading) {
    return {
      validateStatus: 'validating',
      help: 'Loading...',
    };
  }
  if (props.empty) {
    return {
      validateStatus: 'warning',
      help: 'You do not have permission to access the user',
    };
  }
  if (props.error) {
    return {
      validateStatus: 'error',
      help: 'An error has ocurred, please try again later',
    };
  }

  return {};
};

export default SearchBox;
