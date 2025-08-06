const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const clientesRoutes = require('./routes/clientesRoutes');
const estadosRoutes = require('./routes/estadosRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const itensPedidoRoutes = require('./routes/itensPedidoRoutes');


// 👉 Rota da documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use('/clientes', clientesRoutes);
app.use('/estados', estadosRoutes);
app.use('/produtos', produtosRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/itenspedido', itensPedidoRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
