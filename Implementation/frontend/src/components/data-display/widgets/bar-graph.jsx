import React from 'react';
import { Bar } from 'react-chartjs-2';
import { DatePicker } from 'antd';
import { css } from 'emotion';
import {
  center, textCentered,
} from '../../common/styles';
import {
  haveTime, adequateToChartJS,
} from './common';

const R = require('ramda');

const { RangePicker } = DatePicker;

const graphStyle = css`
canvas{
    display: block;
    margin: 0 auto;
}`;

const graphOptions = {
  legend: {
    display: false,
  },
  scales: {
    yAxes: [{
      ticks: {
        suggestedMin: 0,
      },
    }],
  },
};

class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(e) {
    this.setState({
      firstDate: e[0].toDate(),
      secondDate: e[1].toDate(),
    });
  }

  render() {
    const { firstDate, secondDate } = this.state;
    const { data, dataName, title } = this.props;


    return (
      <div className={graphStyle}>
        <h3 className={textCentered}>{title}</h3>
        {renderRangePicker(data, this.onDateChange)}
        <Bar data={filter(firstDate, secondDate, dataName, data)} options={graphOptions} width={600} height={250} />
      </div>
    );
  }
}

export default BarGraph;

const filter = (firstDate, secondDate, prop, data) => R.pipe(
  R.when(_ => firstDate && secondDate, filterByDate(firstDate, secondDate)),
  adequateToChartJS(prop),
)(data);

const filterByDate = R.curry((firstDate, secondDate) => R.filter(isInInterval(firstDate, secondDate)));

const isInInterval = R.curry((firstDate, secondDate, toCheck) => R.pipe(
  R.prop('time'),
  date => new Date(date),
  date => (firstDate < date && date < secondDate),
)(toCheck));

const renderRangePicker = (data, onDateChange) => {
  if (haveTime(data)) {
    return <RangePicker className={center} onDateChange={onDateChange} />;
  }
};
