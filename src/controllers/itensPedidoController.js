const db = require('../db');

// GET /itenspedido
exports.listarItens = async (req, res) => {
  try {
    const sql = `
      SELECT i.*, p.nome AS nome_produto
      FROM itenspedido i
      INNER JOIN produtos p ON i.id_produto = p.id_produto
    `;
    const resultado = await db.query(sql);
    res.json(resultado.rows);
  } catch (err) {
    console.error('Erro ao listar itens de pedido:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET /itenspedido/:id
exports.getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await db.query('SELECT * FROM itenspedido WHERE id_item = $1', [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Item não encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar item:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET /itenspedido/pedido/:id_pedido
exports.getItensPorPedido = async (req, res) => {
  const { id_pedido } = req.params;
  try {
    const sql = `
      SELECT i.*, p.nome AS nome_produto
      FROM itenspedido i
      INNER JOIN produtos p ON i.id_produto = p.id_produto
      WHERE i.id_pedido = $1
    `;
    const resultado = await db.query(sql, [id_pedido]);
    res.json(resultado.rows);
  } catch (err) {
    console.error('Erro ao buscar itens do pedido:', err);
    res.status(500).json({ error: err.message });
  }
};

const { recalcularValorTotal } = require('./pedidosController'); // adicione no topo

// POST /itenspedido
exports.criarItem = async (req, res) => {
  const { id_pedido, id_produto, quantidade, preco_unitario, desconto } = req.body;

  try {
    const sql = `
      INSERT INTO itenspedido (id_pedido, id_produto, quantidade, preco_unitario, desconto)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const valores = [id_pedido, id_produto, quantidade, preco_unitario, desconto ?? 0];
    const resultado = await db.query(sql, valores);

    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro ao criar item de pedido:', err);
    res.status(500).json({ error: err.message });
  }
};

// PUT /itenspedido/:id
exports.atualizarItem = async (req, res) => {
  const { id } = req.params;
  const { id_pedido, id_produto, quantidade, preco_unitario, desconto } = req.body;

  try {
    const sql = `
      UPDATE itenspedido
      SET id_pedido = $1,
          id_produto = $2,
          quantidade = $3,
          preco_unitario = $4,
          desconto = $5
      WHERE id_item = $6
      RETURNING *
    `;
    const valores = [id_pedido, id_produto, quantidade, preco_unitario, desconto, id];
    const resultado = await db.query(sql, valores);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Item não encontrado para atualizar' });
    }

    res.json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar item de pedido:', err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE /itenspedido/:id
exports.deletarItem = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await db.query('DELETE FROM itenspedido WHERE id_item = $1 RETURNING *', [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Item não encontrado para deletar' });
    }

    res.json({ mensagem: 'Item deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar item de pedido:', err);
    res.status(500).json({ error: err.message });
  }
};
