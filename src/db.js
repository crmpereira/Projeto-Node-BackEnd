require('dotenv').config();
const { Pool } = require('pg');
//console.log('Senha do banco:', process.env.DB_PASSWORD);


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
