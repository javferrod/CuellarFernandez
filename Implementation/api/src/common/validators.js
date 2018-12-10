import R from 'ramda';

const PULSE = 'pulse';
const WEIGHT = 'weight';
const LOCATION = 'location';


const isValidType = R.contains(R.__, [PULSE, WEIGHT, LOCATION])


const isValidParameter = (parameter) => {
    if(!isValidType(parameter.type))
        return false;
    if(parameter.type === LOCATION && !isValidLocation(parameter.fields))
        return false;
    if(!R.has(parameter, 'value'))
        return false;

    return true;
}

const isValidLocation = location => R.both(R.has(location,'latitude'), R.has(location,'longitude')); 


export { PULSE, WEIGHT, LOCATION, isValidParameter, isValidType, isValidLocation};
