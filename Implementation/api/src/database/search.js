import { knex } from './init';
import { USERS, TEMPORAL_PARAMETERS, PERMISSIONS } from './names';
import R from 'ramda';


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
        .select('users.id', 'latitude', 'longitude', 'weight', 'hearthrate', 'time'));
}

async function getPermissions(clientID){
    const filter = R.pipe(
        leftJoin(PERMISSIONS, 'user'),
        filterByClient(clientID),
    )

    return filter(knex(USERS))
}

export { searchByID, searchByCodice, searchByParameters, getPermissions, getID }

//HELPERS

const leftJoin = R.curry((table, on, query) => {
    query.leftJoin(table, 'users.id', '=', `${table}.${on}`);
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

        query.whereIn('users.id', subquery);
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
        query.where('users.id', userID);
        return query;
});

const filterByCodice = R.curry((codice, query) => {
        query.where('users.codice', codice);
        return query;
});

const filterByClient = R.curry((clientID, query) => {
        query.where('permissions.client', clientID);
        return query;
});
const notNil = R.pipe(R.isNil, R.not);