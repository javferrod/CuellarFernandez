import { knex } from './init';
import { USERS, TEMPORAL_PARAMETERS, PERMISSIONS } from './names';
import R from 'ramda';
import { filterByUser } from './common';


async function searchByID(userID){
   
    const filter = R.pipe(
        leftJoin(TEMPORAL_PARAMETERS, 'user'),
        filterByID(userID)
    )

    return filter(knex(USERS));
}


async function searchByCodice(codice){
 
    const filter = R.pipe(
        leftJoin(TEMPORAL_PARAMETERS, 'user'),
        filterByCodice(codice)
    )

    return filter(knex(USERS));
}

async function getID(codice){
    const filter = R.pipe(
        filterByCodice(codice)
    )

    return filter(knex(USERS).select('id'));
}

async function searchByParameters(parameters){

    const filter = R.pipe(
        leftJoin(TEMPORAL_PARAMETERS, 'user'),
        filterRanges(parameters),
        filterFixed(parameters)
    );

    return filter(knex(USERS)
        .select(`${USERS}.id`, 'latitude', 'longitude', 'weight', 'hearthrate', 'time', 'birthdate', 'gender'));
}

async function getPermissions(clientID){
    const filter = R.pipe(
        leftJoin(PERMISSIONS, 'user'),
        filterByClient(clientID),
    )

    return filter(knex(USERS))
}

async function havePermission(clientID, codice){
    const filter = R.pipe(
        leftJoin(PERMISSIONS, 'user'),
        filterByClient(clientID),
        filterByCodice(codice),
        filterByStatus(true)
    )

    return ! R.isEmpty(await filter(knex(USERS)))
}

async function retrieveUserPermissions(userID){
    return filterByUser(userID, knex(PERMISSIONS));
}

export { searchByID, searchByCodice, searchByParameters, getPermissions, getID, havePermission, retrieveUserPermissions }

//HELPERS

const leftJoin = R.curry((table, on, query) => {
    query.leftJoin(table, `${USERS}.id`, '=', `${table}.${on}`);
    return query;
});
 
const filterRanges = R.curry((parameters, query) => {
    const { weight, hearthrate } = parameters;

    if(notNil(weight)){
        let subquery = knex
                        .select("user")
                        .from(TEMPORAL_PARAMETERS)
                        .whereBetween('weight', [weight.min, weight.max]);
        query.whereIn('users.id', subquery);
    }
    
    if(notNil(hearthrate)){
        let subquery = knex
                        .select("user")
                        .from(TEMPORAL_PARAMETERS)
                        .whereBetween('hearthrate', [hearthrate.min, hearthrate.max]);

        query.whereIn(`${USERS}.id`, subquery);
    }

    return query;
});

//TODO implement.
const filterFixed = R.curry((parameters, query) => {

    const { gender } = parameters;

    if(notNil(gender))
        query.where('gender', gender);

    return query;
});


const filterByID = R.curry((userID, query) => {
        query.where(`${USERS}.id`, userID);
        return query;
});

const filterByCodice = R.curry((codice, query) => {
        query.where(`${USERS}.codice`, codice);
        return query;
});

const filterByClient = R.curry((clientID, query) => {
        query.where(`${PERMISSIONS}.client`, clientID);
        return query;
});

const filterByStatus = R.curry((accepted, query) => {
    query.where(`${PERMISSIONS}.accepted`, accepted);
    return query;
});

const notNil = R.pipe(R.isNil, R.not);