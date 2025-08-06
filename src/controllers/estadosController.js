const db = require('../db');

// GET /estados
exports.listarEstados = async (req, res) => {
  try {
    const resultado = await db.query('SELECT * FROM estado ORDER BY nome');
    res.json(resultado.rows);
  } catch (err) {
    console.error('Erro ao listar estados:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET /estados/:id
exports.getEstadoById = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await db.query('SELECT * FROM estado WHERE id_estado = $1', [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Estado não encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar estado:', err);
    res.status(500).json({ error: err.message });
  }
};

// POST /estados
exports.criarEstado = async (req, res) => {
  const { nome, uf } = req.body;
  try {
    const sql = 'INSERT INTO estado (nome, uf) VALUES ($1, $2) RETURNING *';
    const resultado = await db.query(sql, [nome, uf]);

    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro ao criar estado:', err);
    res.status(500).json({ error: err.message });
  }
};

// PUT /estados/:id
exports.atualizarEstado = async (req, res) => {
  const { id } = req.params;
  const { nome, uf } = req.body;

  try {
    const sql = `
      UPDATE estado
      SET nome = $1,
          uf = $2
      WHERE id_estado = $3
      RETURNING *
    `;
    const resultado = await db.query(sql, [nome, uf, id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Estado não encontrado para atualizar' });
    }

    res.json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar estado:', err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE /estados/:id
exports.deletarEstado = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await db.query('DELETE FROM estado WHERE id_estado = $1 RETURNING *', [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Estado não encontrado para deletar' });
    }

    res.json({ mensagem: 'Estado deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar estado:', err);
    res.status(500).json({ error: err.message });
  }
};
