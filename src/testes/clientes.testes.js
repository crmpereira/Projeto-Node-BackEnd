const request = require('supertest');
const app = require('../src/app'); // seu express app

describe('Testes para Clientes API', () => {
  it('Deve listar clientes com GET /clientes', async () => {
    const res = await request(app).get('/clientes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Deve criar um cliente com POST /clientes', async () => {
    const novoCliente = { nome: "Teste", cpf: "12345678900" };
    const res = await request(app)
      .post('/clientes')
      .send(novoCliente);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id_cliente');
  });
});
