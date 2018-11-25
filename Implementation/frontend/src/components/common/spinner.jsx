import { Spin, Icon } from 'antd';
import React from 'react';
import { css } from 'emotion';

const container = css`
    width: 100%;
    height: 100%;
    padding-top: 25%;
`;

const spinner = css`
    width: 100%;
    height: 100%;
    padding-top: 25%;
`;

export default function Spinner() {
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  return (
    <div className={container}>
      <Spin indicator={antIcon} className={spinner} />
    </div>);
}
