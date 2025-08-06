// test-db.js
require('dotenv').config();
const db = require('./src/db');

console.log('Iniciando teste de conexão com o banco de dados...');

async function test() {
  try {
    console.log('Executando query...');
    const res = await db.query('SELECT NOW()');
    console.log('Conexão OK! Data/hora do banco:', res.rows[0]);
  } catch (err) {
    console.error('❌ Erro na conexão:', err.message);
  } finally {
    db.pool.end(); // encerra conexão com o banco
    console.log('Conexão encerrada.');
  }
}

test();
