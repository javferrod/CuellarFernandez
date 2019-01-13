import { saveUser, saveParameters } from './insert';
import { saveClient } from '.';

const faker = require('faker');
faker.locale='it';

const { name, internet, address, date, random }  = faker;

async function populateUsers(amount){
    
    for(var i = 0; i < amount; i++)
        await saveUser(internet.userName(), internet.password(), name.firstName(), 
                       address.streetAddress(true), generateGender(), date.past(100, '2011-01-01'), 
                       random.uuid())
}

async function populateParameters(amount, amountUsers){

    for(var i=0; i < amount; i++)
        await saveParameters({
            hearthrate: getRandom(40, 300),
            weight: getRandom(40, 120),
            latitude: parseFloat(address.latitude()),
            longitude: parseFloat(address.longitude())
        }, getRandom(1, amountUsers))
    
}

async function createDefaultClient(){
    await saveClient('client', 'client');
}

export { populateUsers, populateParameters, createDefaultClient }

// HELPERS

const generateGender = () => {
    if(Math.random() < 0.5)
        return 'F'
    else
        return 'M'
}

const getRandom = (from, to) => {
    return Math.round(Math.random() * (to-from) + from)
}