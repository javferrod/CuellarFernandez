import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import AppMenu from './common/app-menu';
import SearchPage from './search/search-page';

const { Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <AppMenu />
        <Layout>

          <Content style={{ margin: '0 16px' }}>
            <Route path="/search" component={SearchPage} />
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            TrackMe © 2019 Created by JJ
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
