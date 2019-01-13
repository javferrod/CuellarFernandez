import { knex } from './init';
import { USERS, TEMPORAL_PARAMETERS, PERMISSIONS } from './names';
import R from 'ramda';

async function saveUser(username, password, name, residence, gender, birthdate, codice){

    let data = {
        username,
        password,
        name,
        residence,
        codice,
        gender,
        birthdate,
        client: false
    };

    return knex(USERS).returning('id').insert(data);
}


async function saveClient(username, password, name){

    let data = {
        username,
        password,
        name,
        client: true
    };

    return knex(USERS).returning('id').insert(data);
}

/*
* parameter is a json with the correct keys 
* (hearthrate, weight, latitude or longitude).
* Insert them into the database. 
*/
async function saveParameters(parameters, userID){
    let get = getParameters(userID);

    return knex(TEMPORAL_PARAMETERS)
        .returning('id')
        .insert(
            get(parameters)
        );
}

async function savePermission(clientID, userID){
    return knex(PERMISSIONS)
        .returning('id')
        .insert({
            client: clientID,
            user: userID
        });
}



export { saveUser, saveClient, saveParameters, savePermission };

// HELPERS

const getParameters = (userID) => R.pipe(
    R.pick(['weight', 'hearthrate', 'latitude', 'longitude']),
    R.assoc('user', userID)
)
