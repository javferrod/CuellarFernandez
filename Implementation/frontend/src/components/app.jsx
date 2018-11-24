import React from 'react';
import { css } from 'emotion';

const container = css`
  padding: 15px;
`;

export default class App extends React.Component {
  render() {
    return (
      <div className={container}>
        <h1>Ciao!</h1>
      </div>
    );
  }
}
