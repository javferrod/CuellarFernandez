import React from 'react';
import {
  Input, Button, Card,
} from 'antd';

import {
  background, cardStyle, marginTop10, loginButton,
} from './common-style';
import { combineStyle } from '../../common/util/style';

const Register = () => (
  <div className={background}>

    <Card className={cardStyle} title="Login">
      <Input
        type="text"
        placeholder="User"
      />
      <Input
        className={marginTop10}
        type="password"
        placeholder="Password"
      />
      <Input
        className={marginTop10}
        type="password"
        placeholder="Repeat your password"
      />
      <Button className={combineStyle(marginTop10, loginButton)} type="primary" htmlType="submit">
          Register
      </Button>
      <div className={marginTop10}>
        Already an account?
        {' '}
        <a href="/login">login</a>
      </div>
    </Card>
  </div>
);

export default Register;
