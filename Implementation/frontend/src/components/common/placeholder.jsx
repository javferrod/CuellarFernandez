import React from 'react';
import { Icon } from 'antd';
import { css } from 'emotion';

const containerStyle = css`
    width:100%;
    margin-top: 15%;

    p{
        width: 100%;
        text-align: center;
    }
`;

const iconStyle = css`
    display: block;
    font-size: 100px;
    margin: 15px auto;
`;

const Placeholder = props => (
  <div className={containerStyle}>
    <Icon className={iconStyle} type={props.icon} />
    <p>{props.text}</p>
  </div>
);


export default Placeholder;