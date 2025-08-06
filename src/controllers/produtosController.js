const db = require('../db');

// GET /produtos
exports.listarProdutos = async (req, res) => {
  try {
    const resultado = await db.query('SELECT * FROM produtos ORDER BY nome');
    res.json(resultado.rows);
  } catch (err) {
    console.error('Erro ao listar produtos:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET /produtos/:id
exports.getProdutoById = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await db.query('SELECT * FROM produtos WHERE id_produto = $1', [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar produto:', err);
    res.status(500).json({ error: err.message });
  }
};

// POST /produtos
exports.criarProduto = async (req, res) => {
  const { nome, descricao, preco, estoque } = req.body;

  try {
    const sql = `
      INSERT INTO produtos (nome, descricao, preco, estoque)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const resultado = await db.query(sql, [nome, descricao, preco, estoque ?? 0]);

    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro ao criar produto:', err);
    res.status(500).json({ error: err.message });
  }
};

// PUT /produtos/:id
exports.atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, estoque } = req.body;

  try {
    const sql = `
      UPDATE produtos
      SET nome = $1,
          descricao = $2,
          preco = $3,
          estoque = $4
      WHERE id_produto = $5
      RETURNING *
    `;
    const resultado = await db.query(sql, [nome, descricao, preco, estoque, id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Produto não encontrado para atualizar' });
    }

    res.json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE /produtos/:id
exports.deletarProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await db.query('DELETE FROM produtos WHERE id_produto = $1 RETURNING *', [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Produto não encontrado para deletar' });
    }

    res.json({ mensagem: 'Produto deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar produto:', err);
    res.status(500).json({ error: err.message });
  }
};
