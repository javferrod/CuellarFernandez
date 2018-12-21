import R from 'ramda';

const HEARTHRATE = 'hearthrate';
const WEIGHT = 'weight';
const LOCATION = 'location';


const isValidType = R.contains(R.__, [HEARTHRATE, WEIGHT, LOCATION])

//TODO change this
const isValidParameter = (parameter) => {

    return true;
    if(!isValidType(parameter.type))
        return false;
    if(parameter.type === LOCATION && !isValidLocation(parameter.fields))
        return false;

    return true;
}

const isValidLocation = location => R.both(R.has(location,'latitude'), R.has(location,'longitude')); 


export { HEARTHRATE, WEIGHT, LOCATION, isValidParameter, isValidType, isValidLocation};
