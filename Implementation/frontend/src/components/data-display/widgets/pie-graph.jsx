import React from 'react';
import { Pie } from 'react-chartjs-2';
import { css } from 'emotion';
import { textCentered } from '../../common/styles';
import { adequateToChartJS } from './common';

const graphStyle = css`
canvas{
    display: block;
    margin: 0 auto;
}
`;

const PieGraph = (props) => {
  const { data, dataName, title } = props;
  const adequateData = adequateToChartJS(dataName);
  return (
    <div className={graphStyle}>
      <h3 className={textCentered}>{title}</h3>
      <Pie data={adequateData(data)} width={600} height={250} />
    </div>
  );
};

export default PieGraph;
