// Middleware de validação para dados de entrada

// Validação para criação de cliente
const validateCliente = (req, res, next) => {
  const { nome, cpf, email, telefone } = req.body;
  const errors = [];

  // Validar nome (obrigatório)
  if (!nome || nome.trim().length === 0) {
    errors.push('Nome é obrigatório');
  } else if (nome.length > 100) {
    errors.push('Nome deve ter no máximo 100 caracteres');
  }

  // Validar CPF (opcional, mas se fornecido deve ter 11 dígitos)
  if (cpf && !/^\d{11}$/.test(cpf)) {
    errors.push('CPF deve conter exatamente 11 dígitos numéricos');
  }

  // Validar email (opcional, mas se fornecido deve ser válido)
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Email deve ter um formato válido');
  }

  // Validar telefone (opcional)
  if (telefone && telefone.length > 20) {
    errors.push('Telefone deve ter no máximo 20 caracteres');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// Validação para criação de produto
const validateProduto = (req, res, next) => {
  const { nome, preco, estoque } = req.body;
  const errors = [];

  // Validar nome (obrigatório)
  if (!nome || nome.trim().length === 0) {
    errors.push('Nome do produto é obrigatório');
  }

  // Validar preço (obrigatório e deve ser positivo)
  if (preco === undefined || preco === null) {
    errors.push('Preço é obrigatório');
  } else if (isNaN(preco) || parseFloat(preco) < 0) {
    errors.push('Preço deve ser um número positivo');
  }

  // Validar estoque (opcional, mas se fornecido deve ser não negativo)
  if (estoque !== undefined && (isNaN(estoque) || parseInt(estoque) < 0)) {
    errors.push('Estoque deve ser um número não negativo');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// Validação para login
const validateLogin = (req, res, next) => {
  const { email, senha } = req.body;
  const errors = [];

  if (!email || email.trim().length === 0) {
    errors.push('Email é obrigatório');
  }

  if (!senha || senha.trim().length === 0) {
    errors.push('Senha é obrigatória');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// Validação para criação de item de pedido
const validateItemPedido = (req, res, next) => {
  const { id_pedido, id_produto, quantidade, preco_unitario } = req.body;
  const errors = [];

  // Validar id_pedido (obrigatório)
  if (!id_pedido || isNaN(id_pedido) || parseInt(id_pedido) <= 0) {
    errors.push('ID do pedido é obrigatório e deve ser um número positivo');
  }

  // Validar id_produto (obrigatório)
  if (!id_produto || isNaN(id_produto) || parseInt(id_produto) <= 0) {
    errors.push('ID do produto é obrigatório e deve ser um número positivo');
  }

  // Validar quantidade (obrigatório e deve ser positivo)
  if (quantidade === undefined || quantidade === null || isNaN(quantidade) || parseFloat(quantidade) <= 0) {
    errors.push('Quantidade é obrigatória e deve ser um número positivo');
  }

  // Validar preço unitário (obrigatório e deve ser positivo)
  if (preco_unitario === undefined || preco_unitario === null || isNaN(preco_unitario) || parseFloat(preco_unitario) <= 0) {
    errors.push('Preço unitário é obrigatório e deve ser um número positivo');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// Validação de ID numérico
const validateId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id || isNaN(id) || parseInt(id) <= 0) {
    return res.status(400).json({ error: 'ID deve ser um número positivo válido' });
  }

  next();
};

module.exports = {
  validateCliente,
  validateProduto,
  validateLogin,
  validateItemPedido,
  validateId
};