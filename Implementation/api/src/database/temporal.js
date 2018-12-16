import { InfluxDB, FieldType } from 'influx';
import R from 'ramda'

const DATABASE_NAME = 'temporal_data'
const influx = new InfluxDB({
  host: 'influx',
  database: DATABASE_NAME,
  schema: [
    {
      measurement: 'location',
      fields: {
        latitude: FieldType.FLOAT,
        longitude: FieldType.FLOAT
      },
      tags: ['user']
    },
    {
      measurement: 'hearthrate',
      fields: {
        value: FieldType.INTEGER,
      },
      tags: ['user']
    },
    {
      measurement: 'weight',
      fields: {
        value: FieldType.FLOAT,
      },
      tags: ['user']
    }
  ]
})


const createInfluxDatabase = async () => {
  let names = await influx.getDatabaseNames();

  if(!R.contains(DATABASE_NAME, names))
    return await influx.createDatabase(DATABASE_NAME)
}

const getParameters = async user => await influx.query('select * from weight')

const saveTemporalParameter = R.curry((user, parameter) =>{
  return influx.writePoints([
      {
        measurement: parameter.type,
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

  var result = await influx.query('select * from ' + where);

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

  let interval = inIntervalIf(query);
  return `WHERE ${interval("weight")} ${interval("hearthrate")}`;
}

const filterByLocation = location => R.filter(isInside(location))

//TODO implement
const isInside = (location, entry) => {
  return true;
}


//Maybe this needs to be refactored since there are only two parameters. This seems an overkill.
const inIntervalIf = R.curry((object, propName) => 
                              R.ifElse(
                                R.compose(R.not, R.isEmpty), 
                                R.flip(inInterval)(propName), 
                                R.identity
                              )(object));

const inInterval = R.curry((object, propName) => `AND ( ${propName} > ${R.path([propName, 'min'], object)} AND ${propName} < ${R.path([propName, 'max'], object)} )`)


