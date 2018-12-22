const knexFactory = require('knex');
import { LOCATIONS, USERS , WEIGHTS, HEARTH_RATES } from './names';

var knex;

const CONNECTION_WITHOUT_DATABASE = {
    host : 'timescale',
    user: 'postgres',
    password : 'ramdom_stuff',
    database: 'postgres'
}

const CONNECTION_DETAILS = {
    ...CONNECTION_WITHOUT_DATABASE,
    database : 'data'  
}

async function connectToDatabase(){
        console.log("[i] Connecting to POSTGRES");
        
        knex = createConnection(CONNECTION_DETAILS);

        try{
            await testConnection();
        }
        catch(err){
            knex.destroy();

            console.log('[i] Creating database');
            await createDatabase();

            console.log('[i] Reconnecting to database');
            knex = createConnection(CONNECTION_DETAILS);

            console.log('[i] Creating tables');
            createTables();

            console.log('[i] Creating hypertables');
            createHyperTables();
        }

        console.log("[i] Connected to POSTGRES");
}


async function createDatabase(){
        let temporal = createConnection(CONNECTION_WITHOUT_DATABASE);
        await temporal.raw('CREATE DATABASE data');
        return temporal.destroy();
}

async function createTables(){
    await knex.schema.createTable(USERS, (table) => {
        table.increments();
        table.timestamps();
        table.string('username');
        table.string('password');
        table.string('name');
        table.string('residence');
        table.string('codice')
            .unique();
        table.boolean('client');
    });

    await knex.schema.createTable(WEIGHTS, (table) => {
        table.increments();
        table.timestamp('time')
            .defaultTo(knex.fn.now())
        table.float('weight');
        table.integer('user');
        table.foreign('user')
            .references('users.id');
    });
    
    await knex.schema.createTable(HEARTH_RATES, (table) => {
        table.increments();
        table.timestamp('time')
            .defaultTo(knex.fn.now())
        table.integer('hearthrate');
        table.integer('user');
        table.foreign('user')
            .references('users.id');
    });
    
    await knex.schema.createTable(LOCATIONS, (table) => {
        table.increments();
        table.timestamp('time')
            .defaultTo(knex.fn.now())
        table.float('latitude');
        table.float('longitude');
        table.integer('user');
        table.foreign('user')
            .references('users.id');
    });
};

async function createHyperTables(){
    knex.raw("CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;");
    knex.raw("SELECT create_hypertable('weights', 'time')");
    knex.raw("SELECT create_hypertable('hearthrates', 'time')");
    knex.raw("SELECT create_hypertable('locations', 'time')");
}

function createConnection (connection){
    return knexFactory({
        client: 'pg',
        connection: connection,
        useNullAsDefault: true
    })
};


function testConnection(){
    return knex.raw('SELECT 1+1 as result');
}


export { connectToDatabase, knex };