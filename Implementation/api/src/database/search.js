import { knex } from './init';
import { USERS, WEIGHTS, LOCATIONS, HEARTH_RATES } from './names';
import R from 'ramda';


async function getParameters(userID){
    return knex(USERS)
        .join(WEIGHTS, 'users.id', '=', 'weights.user')
        .join(HEARTH_RATES, 'users.id', '=', 'hearthrates.user')
        .join(LOCATIONS, 'users.id', '=', 'locations.user')
        .where('users.id',userID);
}

async function searchByCodice(codice){
    return knex
        .select()
        // TODO refine .select('hearthrate, weight, latitude, longitude, time')
        .from(USERS)
        .leftJoin(WEIGHTS, 'users.id', '=', 'weights.user')
        .leftJoin(HEARTH_RATES, 'users.id', '=', 'hearthrates.user')
        .leftJoin(LOCATIONS, 'users.id', '=', 'locations.user')
        .where('users.codice', codice);
}

async function searchByParameters(parameters){

    const filter = R.pipe(
        leftJoin(WEIGHTS),
        leftJoin(HEARTH_RATES),
        leftJoin(LOCATIONS),
        filterRanges(parameters),
        filterFixed(parameters)
    );

    return filter(knex.from(USERS).select('latitude','longitude', 'weight', 'hearthrate','time'));
}

export { searchByCodice, searchByParameters }

const leftJoin = R.curry((table, query) => {
    query.leftJoin(table, 'users.id', '=', `${table}.user`);
    return query;
});

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
    return query;
});


const notNil = R.pipe(R.isNil, R.not);

