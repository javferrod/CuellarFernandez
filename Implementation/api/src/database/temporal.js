import { InfluxDB, FieldType } from 'influx';
import R from 'ramda'

const DATABASE_NAME = 'temporal_data'
const influx = new InfluxDB({
  host: 'influx',
  database: DATABASE_NAME,
  schema: [
    {
      measurement: 'data',
      fields: {
        latitude: FieldType.FLOAT,
        longitude: FieldType.FLOAT,
        hearthrate: FieldType.INTEGER,
        weight: FieldType.FLOAT,
      },
      tags: ['user']
    }
  ]
})


const createInfluxDatabase = async () => {
  let names = await influx.getDatabaseNames();

  let measurements = await influx.getMeasurements();

  console.log(measurements);

  if(!R.contains(DATABASE_NAME, names))
    return await influx.createDatabase(DATABASE_NAME)
}

const getParameters = async user => await influx.query('select * from weight')

const saveTemporalParameter = R.curry( async (user, parameter) => {
  console.log(parameter);
  return await influx.writePoints([
      {
        measurement: 'data',
        tags: { user: user},
        fields: {...parameter.fields},
      }
  ])
});

/*
* Builds the select and executed it. If the object 
* Query have already results (from fixed database)
* it only search the already matched users.
*/

const temporalSearch = async query => {
  let where = buildWhere(query);

  console.log(where);

  var result = await influx.query('select * FROM data ' + where);

  if(query.haveLocation())
    result = filterByLocation(query.location)(result)

  query.temporalResults = result;

  return query;
}

export { saveTemporalParameter, temporalSearch, getParameters, createInfluxDatabase };

// Helpers

const buildWhere = (query) => {
  if(!query.haveWeight() && !query.haveHearthRate())
    return "";


  let interval = inInterval(query.temporalParameters);

  if(query.haveWeight() && query.haveHearthRate())
    return `WHERE ${interval('weight')} AND ${interval('hearthrate')}`

  if(query.haveWeight()) 
    return `WHERE ${interval('weight')}`
  
    if(query.haveHearthRate()) 
    return `WHERE ${interval('hearthrate')}`
}

const filterByLocation = location => R.filter(isInside(location))

//TODO implement
const isInside = (location, entry) => {
  return true;
}

const inInterval = R.curry((object, propName) => `( ${propName} > ${R.path([propName, 'min'], object)} AND ${propName} < ${R.path([propName, 'max'], object)} )`)


