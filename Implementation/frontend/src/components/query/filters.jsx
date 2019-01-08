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

class Filters extends React.Component {
  constructor(props) {
    super(props);

    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleHearthrateChange = this.handleHearthrateChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleAgeChange(value) {
    this.setState({
      age: {
        min: value[0],
        max: value[1],
      },
    });
  }

  handleWeightChange(value) {
    this.setState({
      weight: {
        min: value[0],
        max: value[1],
      },
    });
  }

  handleHearthrateChange(value) {
    this.setState({
      hearthrate: {
        min: value[0],
        max: value[1],
      },
    });
  }

  handleGenreChange(value) {
    this.setState({
      gender: value,
    });
  }

  handleLocationChange(value) {
    this.setState({
      location: value,
    });
  }

  submit() {
    const { onSearch } = this.props;

    onSearch(this.state);
  }

  render() {
    const { className } = this.props;
    return (
      <Row className={className} gutter={16}>
        <Col span={16}>
          <DrawableMap center={MILANO} onChange={this.handleLocationChange} />
        </Col>
        <Col span={8}>
          <Card
            title="Filters"
            actions={[<Icon type="filter" onClick={this.submit} />]}
            className={cardBody}
          >
            <p>Age</p>
            <Slider min={8} max={100} range defaultValue={[8, 100]} onChange={this.handleAgeChange} />
            <p>Weight</p>
            <Slider min={40} max={120} range defaultValue={[40, 120]} onChange={this.handleWeightChange} />
            <p>Hearthrate</p>
            <Slider min={40} max={300} range defaultValue={[40, 300]} onChange={this.handleHearthrateChange} />
            <p>Gender</p>
            <Select defaultValue="both" onChange={this.handleGenreChange}>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="both">Both</Option>
            </Select>

          </Card>
        </Col>
      </Row>
    );
  }
}

export default Filters;
