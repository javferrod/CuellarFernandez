import React from 'react';
import MG from 'metrics-graphics';
import 'metrics-graphics/dist/metricsgraphics.css';

const R = require('ramda');

class TimeGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { target: `graph-${props.title}` };
  }

  componentDidUpdate() {
    const {
      title, data, x, y,
    } = this.props;
    const { target } = this.state;

    if (!R.isNil(data)) { hookupMG(title, data, `#${target}`, x, y); }
  }

  render() {
    const { target } = this.state;


    return (
      <div id={target} />
    );
  }
}


const hookupMG = (title, data, target, xAccessor, yAccessor) => {
  MG.data_graphic({
    width: 600,
    height: 250,
    title,
    data: reformatDates(data),
    target,
    x_accessor: xAccessor,
    y_accessor: yAccessor,
    brush: 'x',
  });
};

export default TimeGraph;

// HELPERS
const reformatDates = R.map(object => ({ ...object, time: new Date(object.time) }));
