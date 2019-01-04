import Router from 'koa-router';
import { searchByCodice, searchByParameters, havePermission } from '../database';
import R from 'ramda';

const MIN_USERS = 2;

var queryManager = new Router({ prefix: '/query' });

queryManager.post('/codice', async (ctx, next) => {
    const { id, codice } = ctx.request.body;
    let individual = await searchByCodice(codice);

    if(R.isEmpty(individual)){
        ctx.response.body = [];
        return;
    }

    if(! await havePermission(id, codice)){
       ctx.response.status = 403; 
    }

    ctx.response.body = {
        name: get('name')(individual), 
        residence: get('residence')(individual), 
        genre: get('genre')(individual), 
        codice: get('codice')(individual), 
        location: getLocations(individual),
        weight: getWeight(individual),
        hearthrate: getHearthRate(individual) 
    };
})

/*
query : {
    location: {lat, long},
    residence: {lat, long},
    age: {min, max},
    genre: {m/f},
    weight: {min, max}
    hearthrate: {min, max}
}
*/


queryManager.post('/', async (ctx, next) => {
    let resul = await searchByParameters(ctx.request.body.parameters);
    let groupedResul = groupByUser(resul);
    
    if(countUsers(groupedResul) >= MIN_USERS)
        ctx.response.body = groupedResul; //remix(groupedResul);
    else
        ctx.response.status = 403;
})

export default queryManager;


const groupByUser = R.groupBy(R.prop('id'));
const countUsers = R.pipe(
    R.keys,
    R.length
)

const getLocations = projectProps(['time', 'latitude', 'longitude']);
const getWeight = projectProps(['time', 'weight']);
const getHearthRate = projectProps(['time', 'hearthrate']);

function projectProps(props){
    return R.pipe(
        R.project(props),
        R.filter(notNil(props))
    )
}

function notNil(props){
    return R.pipe(
        R.pick(props),
        R.values,
        R.reject(R.isNil),
        R.length,
        R.equals(R.length(props))
    )
}

const get = prop => R.pipe(
    R.head,
    R.prop(prop)
)
/*const remix = R.pipe(
    remixLatitude
)*/