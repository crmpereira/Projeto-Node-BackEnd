// Middleware de tratamento de erros global

const errorHandler = (err, req, res, next) => {
  console.error('Erro capturado:', err);

  // Erro de validação do Sequelize
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(error => error.message);
    return res.status(400).json({
      error: 'Erro de validação',
      details: errors
    });
  }

  // Erro de chave única do Sequelize
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: 'Conflito de dados',
      message: 'Registro já existe'
    });
  }

  // Erro de chave estrangeira do Sequelize
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      error: 'Erro de referência',
      message: 'Referência inválida para outro registro'
    });
  }

  // Erro de conexão com banco de dados
  if (err.name === 'SequelizeConnectionError') {
    return res.status(503).json({
      error: 'Erro de conexão',
      message: 'Serviço temporariamente indisponível'
    });
  }

  // Erro de JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Token inválido',
      message: 'Token de autenticação inválido'
    });
  }

  // Erro de JWT expirado
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expirado',
      message: 'Token de autenticação expirado'
    });
  }

  // Erro de sintaxe JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'JSON inválido',
      message: 'Formato de dados inválido'
    });
  }

  // Erro padrão do servidor
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Erro interno do servidor';

  res.status(statusCode).json({
    error: process.env.NODE_ENV === 'production' ? 'Erro interno do servidor' : message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

// Middleware para capturar rotas não encontradas
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Rota não encontrada - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = {
  errorHandler,
  notFoundHandler
};