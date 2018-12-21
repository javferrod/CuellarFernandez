import { isValidParameter } from "../src/common/validators";

describe('Query validators', () => {
    it('should retun valid', async () => {

        let queryJSON = {
            "auth":"qwqw",
            "parameters": [{
                "type": "weight",
                "fields": {
                    "value":"100"}
            }
            ]
            
        }

        console.log(queryJSON.parameters[0].fields.value)
        expect(isValidParameter(queryJSON.parameters[0])).toBe(true);

    })
});