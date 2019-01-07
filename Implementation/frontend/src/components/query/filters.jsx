import React from 'react';
import {
  Row, Col, Slider, Select, Card, Icon,
} from 'antd';
import { css } from 'emotion';

import DrawableMap from './draw-map';


const MILANO = [45.4542119, 9.11135096];

const cardBody = css`
.ant-card-body{
    height: 297px
`;

const { Option } = Select;

const Filters = props => (
  <Row className={props.className} gutter={16}>
    <Col span={16}>
      <DrawableMap center={MILANO} onChange={console.log} />
    </Col>
    <Col span={8}>
      <Card
        title="Filters"
        actions={[<Icon type="filter" />]}
        className={cardBody}
      >
        <p>Age</p>
        <Slider min={8} max={100} range defaultValue={[8, 100]} />
        <p>Weight</p>
        <Slider min={40} max={120} range defaultValue={[40, 120]} />
        <p>Hearthrate</p>
        <Slider min={40} max={300} range defaultValue={[40, 300]} />
        <p>Gender</p>
        <Select defaultValue="both" onChange={handleChange}>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="both">Both</Option>
        </Select>

      </Card>
    </Col>
  </Row>
);

function handleChange() {
  console.log('pee');
}

export default Filters;
