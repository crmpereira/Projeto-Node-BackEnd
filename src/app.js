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

require('dotenv').config();

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000"   // libera só para o frontend React
}));



app.use('/clientes', clientesRoutes);
app.use('/estados', estadosRoutes);
app.use('/produtos', produtosRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/itenspedido', itensPedidoRoutes);
app.use('/api', authRoutes);

//const PORT = process.env.PORT || 5000;
const PORT = 5000;

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
