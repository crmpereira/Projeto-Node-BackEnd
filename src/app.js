const express = require('express');
const cors = require('cors');
const sequelize = require('./sequelize');  // importando o Sequelize
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const clientesRoutes = require('./routes/clientesRoutes');
const estadosRoutes = require('./routes/estadosRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const itensPedidoRoutes = require('./routes/itensPedidoRoutes');
const authRoutes = require('./routes/authRoutes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

require('dotenv').config();

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

// Configuração do CORS
const corsOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000'];
app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use('/clientes', clientesRoutes);
app.use('/estados', estadosRoutes);
app.use('/produtos', produtosRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/itens-pedido', itensPedidoRoutes);
app.use('/api', authRoutes);

// Middleware de tratamento de erros (deve vir por último)
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log('Banco sincronizado');
    app.listen(PORT, () => {
      console.log(`Servidor rodando porta: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao sincronizar banco:', err);
  });

module.exports = app;
