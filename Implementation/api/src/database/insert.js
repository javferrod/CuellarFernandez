import { knex } from './init';
import { HEARTH_RATES, WEIGHTS, LOCATIONS, USERS } from './names';
import R from 'ramda';

async function saveUser(username, password, name, residence, codice){

    let data = {
        username,
        password,
        name,
        residence,
        codice,
        client: false
    };

    return await knex(USERS).returning('id').insert(data);
}


async function saveClient(username, password, name){

    let data = {
        username,
        password,
        name,
        client: true
    };

    return await knex(USERS).returning('id').insert(data);
}

/*
* parameter is a json with the correct keys 
* (hearthrate, weight, latitude or longitude)
* and insert them into the database. 
*/
async function saveParameters(parameter, userID){

    let has = haveAllProps(parameter);
    let get = getAndAddUser(parameter, userID);

    if(has(['weight']))
        await knex(WEIGHTS).returning('id').insert(get(['weight']));

    if(has(['hearthrate']))
        await knex(HEARTH_RATES).returning('id').insert(get(['hearthrate']));
    
    if(has(['latitude', 'longitude']))
        await knex(LOCATIONS).returning('id').insert(get(['latitude', 'longitude']));
}



export { saveUser, saveClient, saveParameters};

// HELPERS

const haveAllProps = R.curry(((object, props) => R.pipe(
    R.pick(props),
    R.keys,
    R.length,
    R.equals(R.length(props)))(object)));

const getAndAddUser = R.curry((object, userID, props) => R.pipe(
    R.pick(props),
    R.assoc('user', userID))(object));
