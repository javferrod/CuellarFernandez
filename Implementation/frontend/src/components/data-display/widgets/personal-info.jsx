import React from 'react';
import { Card, Row, Col } from 'antd';
import { css } from 'emotion';
import { bold } from '../../common/styles';

const R = require('ramda');

const cardStyle = css`
    min-height:400px;
`;
const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const PersonalInfo = (props) => {
  const { name, codice, residence, genre } = props;
  console.log(props);
  return (
    <Card className={cardStyle} title={name}>
      {generateRow('Codice fiscale', codice)}
      {generateRow('Residence', residence)}
      {generateRow('Genre', genre)}
      {generateRow('Codice fiscale', codice)}
    </Card>
  );
};

export default PersonalInfo;

const generateRow = R.curry((friendlyName, prop) => R.unless(
  R.isNil,
  value => (
    <Row gutter={16}>
      <Col span={12}>
        <p className={bold}>{friendlyName}</p>
      </Col>
      <Col span={12}>
        { value }
      </Col>
    </Row>
  ),
)(prop));
