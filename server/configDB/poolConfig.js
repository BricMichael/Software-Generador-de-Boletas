const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '10032000',
    database: 'preescolar',
    port: '5432'
});

module.exports = pool;