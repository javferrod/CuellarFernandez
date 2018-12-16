import Query from "../src/database/query";

describe('Query class', () => {
    it('should return the appropiated booleans', async () => {



let queryInJson = {
    age: {min:20, max:30},
    weight: {min:10, max:200},
    hearthrate: {min:60, max:180}
}

        let query = new Query(queryInJson);

        expect(query.haveLocation()).toBe(false);
        expect(query.haveWeight()).toBe(true);
        expect(query.haveHearthRate()).toBe(true);
        expect(query.haveFixedParameters()).toBe(true);
        expect(query.haveTemporalParameters()).toBe(true);

    })
});

