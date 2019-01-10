import React from 'react';
import { Pie } from 'react-chartjs';
import { css } from 'emotion';
import { textCentered } from '../../common/styles';

const R = require('ramda');


const graphStyle = css`
canvas{
    display: block;
    margin: 0 auto;
}
`;

const PieGraph = (props) => {
  const { data, dataName, title } = props;
  const adequateData = adequate(dataName);
  console.log(adequateData(data));
  return (
    <div className={graphStyle}>
      <h3 className={textCentered}>{title}</h3>
      <Pie data={adequateData(data)} width="600" height="250" />
    </div>
  );
};

export default PieGraph;

const adequate = prop => R.ifElse(
  R.isNil,
  _ => [{}],
  R.pipe(
    R.countBy(R.prop(prop)),
    R.toPairs,
    R.map(mapPairToObject),
  ),
);

const mapPairToObject = pair => ({
  value: pair[1],
  label: pair[0],
});
