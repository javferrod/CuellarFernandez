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
        .select('users.id, latitude','longitude', 'weight', 'hearthrate','time'));
}

export { searchByID, searchByCodice, searchByParameters }

//HELPERS

const leftJoin = R.curry((table, query) => {
    query.leftJoin(table, 'users.id', '=', `${table}.user`);
    return query;
});

//TODO refactor this 
//SELECT * from temporal_parameters where "user" IN (select "user" from temporal_parameters where hearthrate>90) AND "user" IN (SELECT "user" from temporal_parameters WHERE weight >100); 

const filterRanges = R.curry((parameters, query) =>{
    const { weight, hearthrate } = parameters;

    if(notNil(weight))
        query.whereBetween('weight', [weight.min, weight.max]);
    
    if(notNil(hearthrate))
        query.whereBetween('hearthrate', [hearthrate.min, hearthrate.max]);

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

