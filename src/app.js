const express = require('express');
const sequelize = require('./sequelize');  // importando o Sequelize
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const clientesRoutes = require('./routes/clientesRoutes');
const estadosRoutes = require('./routes/estadosRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const itensPedidoRoutes = require('./routes/itensPedidoRoutes');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.use('/clientes', clientesRoutes);
app.use('/estados', estadosRoutes);
app.use('/produtos', produtosRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/itenspedido', itensPedidoRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;

// Aqui sincroniza o banco (cria tabelas que não existem, se quiser)
// Se você já tem tabelas, pode comentar essa parte
sequelize.sync()
  .then(() => {
    console.log('Banco sincronizado');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao sincronizar banco:', err);
  });

module.exports = app;
