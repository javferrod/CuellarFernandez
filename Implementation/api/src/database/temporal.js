import { InfluxDB, FieldType } from 'influx';
import R from 'ramda'
import { isTemporalQuery } from '../common/query-helpers';

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

const temporalSearch = query => {
  let where = buildQuery(query);

  return influx.query('select * from ' + where);
}

export { saveTemporalParameter, temporalSearch, getParameters, createInfluxDatabase };

// Helpers

//TODO Location is not searched like this, I'm affraid that a manual filter have to be done.
const buildQuery = (query) => {
  if(isTemporalQuery(query))
    return "";

  let interval = inIntervalIf(query);
  return `WHERE ${interval("weight")} ${interval("location")} ${interval("hearthrate")}`;
}

const inIntervalIf = R.curry((object, propName) => 
                              R.ifElse(
                                R.compose(R.not, R.isEmpty), 
                                R.flip(inInterval)(propName), 
                                R.identity
                              )(object));

const inInterval = R.curry((object, propName) => `AND ( ${propName} > ${R.path([propName, 'min'], object)} AND ${propName} < ${R.path([propName, 'max'], object)} )`)


