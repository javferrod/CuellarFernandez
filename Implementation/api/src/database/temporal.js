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

const saveTemporalParameter = R.curry((user, parameter) =>{
  console.log('holi'+parameter);
  return influx.writePoints([
      {
        measurement: parameter.type,
        tags: { user: user},
        fields: {...parameter.fields},
      }
  ])
});

const temporalSearch = query => {
  const {weight, location, hearthrate} = query;

  let query = `select * WHERE ${inInterval(weight)} AND ${inInterval(hearthrate)}`

  influx.query('select * from ')
} 


const inInterval = R.curry((object, propName) => `( ${propName} > ${R.path([propName, 'min'], object)} AND ${propName} < ${R.path([propName, 'max'], object)} )`)


const getParameters = async user => await influx.query('select * from weight')

export { saveTemporalParameter, getParameters, createInfluxDatabase };