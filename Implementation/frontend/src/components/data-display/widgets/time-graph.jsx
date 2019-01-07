import React from 'react';
import MG from 'metrics-graphics';
import 'metrics-graphics/dist/metricsgraphics.css';
import { css } from 'emotion';
import Placeholder from '../../common/placeholder';

const R = require('ramda');

const graphStyle = css`
  width:100%;
  svg{
    width:100%;
  }
`;

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
    const { title, data } = this.props;

    if (R.isNil(data) || R.isEmpty(data)) {
      return (
        <Placeholder text={`No ${title} data avaialble`} icon="warning" />
      );
    }

    return (
      <div className={graphStyle} id={target} />
    );
  }
}


const hookupMG = (title, data, target, xAccessor, yAccessor) => {
  MG.data_graphic({
    width: 800,
    height: 300,
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
