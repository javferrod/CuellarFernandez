"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectToDatabase = connectToDatabase;
exports.knex = void 0;

var _names = require("./names");

const knexFactory = require('knex');

var knex;
exports.knex = knex;
const CONNECTION_WITHOUT_DATABASE = {
  host: 'timescale',
  user: 'postgres',
  password: 'ramdom_stuff',
  database: 'postgres'
};
const CONNECTION_DETAILS = { ...CONNECTION_WITHOUT_DATABASE,
  database: 'data'
};

async function connectToDatabase() {
  console.log("[i] Connecting to POSTGRES");
  exports.knex = knex = createConnection(CONNECTION_DETAILS);

  try {
    await testConnection();
  } catch (err) {
    knex.destroy();
    console.log('[i] Creating database');
    await createDatabase();
    console.log('[i] Reconnecting to database');
    exports.knex = knex = createConnection(CONNECTION_DETAILS);
    console.log('[i] Creating tables');
    createTables();
    console.log('[i] Creating hypertables');
    createHyperTables();
  }

  console.log("[i] Connected to POSTGRES");
}

async function createDatabase() {
  let temporal = createConnection(CONNECTION_WITHOUT_DATABASE);
  await temporal.raw('CREATE DATABASE data');
  return temporal.destroy();
}

async function createTables() {
  await knex.schema.createTable(_names.USERS, table => {
    table.increments();
    table.timestamps();
    table.string('username');
    table.string('password');
    table.string('name');
    table.string('residence');
    table.string('gender');
    table.string('codice').unique();
    table.boolean('client');
  });
  await knex.schema.createTable(_names.TEMPORAL_PARAMETERS, table => {
    table.increments();
    table.timestamp('time').defaultTo(knex.fn.now());
    table.float('weight');
    table.integer('hearthrate');
    table.float('latitude');
    table.float('longitude');
    table.integer('user');
    table.foreign('user').references('users.id');
  });
}

;

async function createHyperTables() {
  knex.raw("CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;");
  knex.raw(`SELECT create_hypertable('${_names.TEMPORAL_PARAMETERS}', 'time')`);
}

function createConnection(connection) {
  return knexFactory({
    client: 'pg',
    connection: connection,
    useNullAsDefault: true
  });
}

;

function testConnection() {
  return knex.raw('SELECT 1+1 as result');
}