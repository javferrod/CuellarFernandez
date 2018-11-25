import Influx from 'influx';

const influx = new Influx.InfluxDB({
  host: 'influx',
  database: 'express_response_db',
  schema: [
    /* TODO: Choose a schema for the data
    {
      measurement: 'response_times',
      fields: {
        path: Influx.FieldType.STRING,
        duration: Influx.FieldType.INTEGER
      },
      tags: [
        'host'
      ]
    }*/
  ]
})
