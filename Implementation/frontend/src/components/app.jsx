import React from 'react';
import { connect } from 'react-redux';
import Login from './auth/login';

const App = (props) => {
  const { isLogged } = props;

  if (!isLogged) { return <Login />; }

  return (
    <div>
        Logged
    </div>

  );
};

const mapStateToProps = state => ({
  isLogged: state.auth.token !== null,
});

export default connect(mapStateToProps)(App);
