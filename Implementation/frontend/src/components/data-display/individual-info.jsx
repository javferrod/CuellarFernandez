import React from 'react';
import { Row, Col, Card } from 'antd';
import TimeGraph from './widgets/time-graph';
import PersonalInfo from './widgets/personal-info';
import HeathMap from './widgets/heath-map';
import { marginTop32 } from '../common/styles';

const IndividualInfo = (props) => {
  const {
    name, codice, weight, hearthrate, location, residence, gender, birthdate,
  } = props;
  return (
    <div>
      <Row gutter={16} className={marginTop32}>
        <Col span={16}>
          <HeathMap data={location} />
        </Col>
        <Col span={8}>
          <PersonalInfo name={name} codice={codice} residence={residence} gender={gender} birthdate={birthdate} />
        </Col>
      </Row>
      <Row gutter={16} className={marginTop32}>
        <Col span={12}>
          <Card>
            <TimeGraph data={weight} x="time" y="weight" title="Weight" />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <TimeGraph data={hearthrate} x="time" y="hearthrate" title="Hearthrate" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};


export default IndividualInfo;
