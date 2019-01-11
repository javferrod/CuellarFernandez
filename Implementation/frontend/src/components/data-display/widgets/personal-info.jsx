import React from 'react';
import { Card, Row, Col } from 'antd';
import { css } from 'emotion';
import { bold } from '../../common/styles';
import Placeholder from '../../common/placeholder';

const R = require('ramda');

const cardStyle = css`
    min-height:400px;
`;
const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const PersonalInfo = (props) => {
  const {
    name, codice, residence, gender, birthdate
  } = props;

  if (R.isNil(name)) {
    return (
      <Card className={cardStyle} title={name}>
        <Placeholder icon="question" text="No personal information available" />
      </Card>
    );
  }

  return (
    <Card className={cardStyle} title={name}>
      {generateRow('Codice fiscale', codice)}
      {generateRow('Residence', residence)}
      {generateRow('Gender', gender)}
      {generateRow('Birthdate', birthdate)}
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
