import React from 'react';
import TimeGraph from './widgets/time-graph';


const IndividualInfo = (props) => {
  console.log(props);
  return (
    <div>
      <TimeGraph data={props.weight} x="time" y="weight" title="Weight" />
      <TimeGraph data={props.hearthrate} x="time" y="hearthrate" title="Hearthrate" />
    </div>
  );
};


export default IndividualInfo;
