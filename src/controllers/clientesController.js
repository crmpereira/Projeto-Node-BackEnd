const db = require('../db');

// POST /clientes
exports.criarCliente = async (req, res) => {
  const { nome, cpf, email, telefone, id_estado, ativo = true } = req.body;

  try {
    // Verificar se CPF já existe
    if (cpf) {
      const cpfExistente = await db.query('SELECT id_cliente FROM cliente WHERE cpf = $1', [cpf]);
      if (cpfExistente.rows.length > 0) {
        return res.status(400).json({ error: 'CPF já cadastrado' });
      }
    }

    // Verificar se email já existe
    if (email) {
      const emailExistente = await db.query('SELECT id_cliente FROM cliente WHERE email = $1', [email]);
      if (emailExistente.rows.length > 0) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }
    }

    const sql = `
      INSERT INTO cliente (nome, cpf, email, telefone, id_estado, ativo)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const valores = [nome, cpf, email, telefone, id_estado, ativo];
    const resultado = await db.query(sql, valores);

    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro ao criar cliente:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET /clientes
exports.listarClientes = async (req, res) => {
  try {
    const sql = `
      SELECT c.*, e.nome AS nome_estado, e.uf
      FROM cliente c
      LEFT JOIN estado e ON c.id_estado = e.id_estado
    `;
    const resultado = await db.query(sql);
    res.json(resultado.rows);
  } catch (err) {
    console.error('Erro ao listar clientes:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET /clientes/:id
exports.getClienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = `
      SELECT c.*, e.nome AS nome_estado, e.uf
      FROM cliente c
      LEFT JOIN estado e ON c.id_estado = e.id_estado
      WHERE c.id_cliente = $1
    `;
    const resultado = await db.query(sql, [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar cliente por ID:', err);
    res.status(500).json({ error: err.message });
  }
};

// PUT /clientes/:id
exports.atualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, cpf, email, telefone, id_estado, ativo } = req.body;

  try {
    const sql = `
      UPDATE cliente
      SET nome = $1,
          cpf = $2,
          email = $3,
          telefone = $4,
          id_estado = $5,
          ativo = $6
      WHERE id_cliente = $7
      RETURNING *
    `;
    const valores = [nome, cpf, email, telefone, id_estado, ativo, id];
    const resultado = await db.query(sql, valores);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado para atualizar' });
    }

    res.json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar cliente:', err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE /clientes/:id
exports.deletarCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const sql = `DELETE FROM cliente WHERE id_cliente = $1 RETURNING *`;
    const resultado = await db.query(sql, [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado para deletar' });
    }

    res.json({ mensagem: 'Cliente deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar cliente:', err);
    res.status(500).json({ error: err.message });
  }
};
