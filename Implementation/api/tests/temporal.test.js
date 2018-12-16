import { temporalSearch } from "../src/database/temporal";
import { InfluxDB } from 'influx';
import Query from '../src/database/query';

jest.mock('influx');

describe('Temporal database', () => {
    it('should form a valid select filtering by weight and hearthrate', async () => {

  let instance = InfluxDB.mock.instances[0];

  instance.query.mockResolvedValue([]);

  
        let json = {
            weight: {min:1, max:200},
            hearthrate: {min:60, max:300}
        }

        let query = new Query(json);

        let results = await temporalSearch(query);


        expect(instance.query).toBeCalledTimes(1);
        expect(instance.query).toBeCalledWith('select * from measurements WHERE ( weight > 1 AND weight < 200 ) AND ( hearthrate > 60 AND hearthrate < 300 )');
    })
});

