import 'antd/dist/antd.css';
import React from 'react';
import { Menu, Icon, Layout } from 'antd';
import { withRouter, Link } from 'react-router-dom';

const { Sider } = Layout;

function AppMenu(props) {
  const { location } = props;

  return (
    <Sider collapsed>
      <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">

        <Menu.Item key="/search">
          <Link to="/search">
            <Icon type="search" />
            <span>Search</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/query">
          <Link to="/query">
            <Icon type="area-chart" />
            <span>Query</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/permissions">
          <Link to="/permissions">
            <Icon type="user" />
            <span>Permissions</span>
          </Link>
        </Menu.Item>

      </Menu>
    </Sider>

  );
}

export default withRouter(AppMenu);
