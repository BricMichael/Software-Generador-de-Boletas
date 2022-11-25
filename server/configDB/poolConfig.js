const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'data',
    database: 'sistema_boletas',
    port: '5432'
});

module.exports = pool;