import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import AppMenu from './common/app-menu';
import SearchPage from './search/search-page';
import PermissionsPage from './permissions/permissions-page';
import QueryPage from './query/query-page';
import { login } from '../actions/auth';
import Login from './auth/login';

const { Content, Footer } = Layout;

function App(props) {
  const { token, loading, login } = props;
  if (!token) { return <Login onLogin={login} loading={loading} />; }

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <AppMenu />
        <Layout>

          <Content style={{ margin: '0 16px' }}>
            <Route path="/search" component={SearchPage} />
            <Route path="/query" component={QueryPage} />
            <Route path="/permissions" component={PermissionsPage} />
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            TrackMe © 2019 Created by JJ
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

const mapStateToProps = state => ({
  token: state.auth.token,
  loading: state.auth.loading,
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
