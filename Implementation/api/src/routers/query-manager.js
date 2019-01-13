import Router from 'koa-router';
import { searchByCodice, searchByParameters, havePermission } from '../database';
import R from 'ramda';
import { filterGroupedResulByLocation } from '../common/location';

const MIN_USERS = 2;

var queryManager = new Router({ prefix: '/query' });

queryManager.post('/codice', async (ctx, next) => {
    const { auth, codice } = ctx.request.body;
    let individual = await searchByCodice(codice);

    if(R.isEmpty(individual)){
        ctx.response.body = [];
        return;
    }

    if(! await havePermission(auth, codice)){
       ctx.response.status = 403; 
    }

    ctx.response.body = {
        name: get('name')(individual), 
        residence: get('residence')(individual), 
        gender: get('gender')(individual), 
        codice: get('codice')(individual), 
        birthdate: get('birthdate')(individual), 
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
    const { query } = ctx.request.body;

    var resul = await searchByParameters(query);

    var groupedResul = filterGroupedResulByLocation(query, groupByUser(resul));

    if(countUsers(groupedResul) >= MIN_USERS){
        resul = ungroup(groupedResul);

        ctx.response.body = {
            location: getLocations(resul),
            hearthrate: getHearthRate(resul),
            weight: getWeight(resul),
            birthdate: getBirthDates(resul),
            gender: getGenders(resul)
        }
    }
    else
        ctx.response.status = 403;
})

export default queryManager;


const groupByUser = R.groupBy(R.prop('id'));
const ungroup = R.pipe(R.values, R.flatten);

const countUsers = R.pipe(
    R.keys,
    R.length
)

const getLocations = projectProps(['time', 'latitude', 'longitude']);
const getWeight = projectProps(['time', 'weight']);
const getHearthRate = projectProps(['time', 'hearthrate']);
const getBirthDates = R.pipe(projectProps(['id', 'birthdate']), onePerUser());
const getGenders = R.pipe(projectProps(['id', 'gender']), onePerUser());


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

function onePerUser(){
  return R.pipe(
    R.groupBy(R.prop('id')),
    R.map(
      R.pipe(R.values, R.head, R.omit(['id']))
    ),
    R.values,
  )
}

const get = prop => R.pipe(
    R.head,
    R.prop(prop)
)