import React from 'react';
import { Bar } from 'react-chartjs';
import { DatePicker } from 'antd';
import { css } from 'emotion';
import { center, joinCSS, bold, textCentered } from '../../common/styles';

const { RangePicker } = DatePicker;

const R = require('ramda');

const graphStyle = css`
canvas{
    display: block;
    margin: 0 auto;
}
`;

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
        <RangePicker className={center} onChange={this.onDateChange} />
        <Bar data={filter(firstDate, secondDate, dataName, data)} width="600" height="250" />
      </div>
    );
  }
}

export default BarGraph;

const filter = (firstDate, secondDate, prop, data) => R.pipe(
  R.when(_ => firstDate && secondDate, filterByDate(firstDate, secondDate)),
  adequate(prop),
)(data);

const adequate = prop => R.pipe(
  R.defaultTo([]),
  R.countBy(R.prop(prop)),
  values => ({
    labels: R.keys(values),
    datasets: [
      {
        label: 'My First dataset',
        fillColor: 'rgba(64,169,255,0.5)',
        strokeColor: 'rgba(33,160,255,0.8)',
        highlightFill: 'rgba(64,169,225,0.75)',
        highlightStroke: 'rgba(33,160,255,1)',
        data: R.values(values),
      },
    ],
  }),
);

const filterByDate = R.curry((firstDate, secondDate) => R.filter(isInInterval(firstDate, secondDate)));

const isInInterval = R.curry((firstDate, secondDate, toCheck) => R.pipe(
  R.prop('time'),
  date => new Date(date),
  date => (firstDate < date && date < secondDate),
)(toCheck));
