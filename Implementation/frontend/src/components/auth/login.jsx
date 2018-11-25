import React from 'react';
import {
  Input, Button, Card, Skeleton,
} from 'antd';

import { connect } from 'react-redux';
import {
  background, cardStyle, marginTop10, loginButton,
} from './common-style';

import { combineStyle } from '../../common/util/style';
import { login } from '../../actions/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = { username: '', password: '' };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUsername(event) {
    this.setState({ username: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleLogin() {
    const { username, password } = this.state;
    const { dispatch } = this.props;
    dispatch(login(username, password));
  }

  render() {
    const { username, password } = this.state;
    const { loading } = this.props;


    return (
      <div className={background}>

        <Card className={cardStyle} title="Login">
          <Skeleton active loading={loading}>
            <Input
              type="text"
              placeholder="User"
              vallue={username}
              onChange={this.handleUsernamea}
            />
            <Input
              className={marginTop10}
              type="password"
              placeholder="Password"
              vallue={password}
              onChange={this.handlePassword}
            />
            <Button
              className={combineStyle(marginTop10, loginButton)}
              type="primary"
              onClick={this.handleLogin}
            >
            Log in
            </Button>
            <div className={marginTop10}>
              Or
              {' '}
              <a href="/register">register now!</a>
            </div>
          </Skeleton>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
});

export default connect(
  mapStateToProps,
)(Login);
