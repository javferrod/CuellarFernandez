const knexFactory = require('knex');
import { USERS , TEMPORAL_PARAMETERS, PERMISSIONS } from './names';

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
        table.string('username')
            .notNullable();
        table.string('password')
            .notNullable();
        table.string('name');
        table.string('residence');
        table.string('gender');
        table.date('birthdate');
        table.string('codice')
            .unique();
        table.boolean('client')
            .notNullable();
    });
    
    await knex.schema.createTable(PERMISSIONS, (table) => {
        table.increments();
        table.integer('user')
            .notNullable();
        table.integer('client')
            .notNullable();
        table.boolean('accepted')
            .defaultTo(false)
            .notNullable();
        table.unique(['user', 'client']);
        table.foreign('client')
            .references('users.id');
        table.foreign('user')
            .references('users.id');
    });

    await knex.schema.createTable(TEMPORAL_PARAMETERS, (table) => {
        table.increments();
        table.timestamp('time')
            .defaultTo(knex.fn.now())
        table.float('weight');
        table.integer('hearthrate');
        table.float('latitude');
        table.float('longitude');
        table.integer('user');
        table.foreign('user')
            .references('users.id');
    });
};

async function createHyperTables(){
    knex.raw("CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;");
    knex.raw(`SELECT create_hypertable('${TEMPORAL_PARAMETERS}', 'time')`);
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