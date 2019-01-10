import React from 'react';
import { Row, Col, Card } from 'antd';
import BarGraph from './widgets/bar-graph';

import { marginTop32 } from '../common/styles';
import HeathMap from './widgets/heath-map';
import PieGraph from './widgets/pie-graph';

const CollectiveInfo = props => (
  <div>
    <Row gutter={16} className={marginTop32}>
      <Col span={12}>
        <Card>
          <BarGraph title="Weight" data={props.weight} dataName="weight" />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <BarGraph title="Hearthrate" data={props.hearthrate} dataName="hearthrate" />
        </Card>
      </Col>
    </Row>
    <Row gutter={16} className={marginTop32}>
      <Col span={24}>
        <HeathMap data={props.location} />
      </Col>
    </Row>
    <Row gutter={16} className={marginTop32}>
      <Col span={12}>
        <Card>
          <BarGraph title="Age" data={props.age} dataName="age" />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <PieGraph title="Gender" data={props.gender} dataName="gender" />
        </Card>
      </Col>
    </Row>
  </div>
);


export default CollectiveInfo;
