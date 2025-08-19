const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Vendas',
      version: '1.0.0',
      description: 'Documentação da API de Vendas com Express e PostgreSQL'
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor local'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // onde ele vai procurar as anotações
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
