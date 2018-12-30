import { knex } from './init';
import { USERS, TEMPORAL_PARAMETERS } from './names';
import R from 'ramda';


async function searchByID(userID){
   
    const filter = R.pipe(
        leftJoin(TEMPORAL_PARAMETERS),
        filterByID(userID)
    )

    return filter(knex(USERS));
}

async function searchByCodice(codice){
 
    const filter = R.pipe(
        leftJoin(TEMPORAL_PARAMETERS),
        filterByCodice(codice)
    )

    return filter(knex(USERS));
}

async function searchByParameters(parameters){

    const filter = R.pipe(
        leftJoin(TEMPORAL_PARAMETERS),
        filterRanges(parameters),
        filterFixed(parameters)
    );

    return filter(knex(USERS)
        .select('users.id', 'latitude', 'longitude', 'weight', 'hearthrate', 'time'));
}

export { searchByID, searchByCodice, searchByParameters }

//HELPERS

const leftJoin = R.curry((table, query) => {
    query.leftJoin(table, 'users.id', '=', `${table}.user`);
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

const notNil = R.pipe(R.isNil, R.not);