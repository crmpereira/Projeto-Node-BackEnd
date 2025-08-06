const db = require('../db');

// 🔧 Função auxiliar para recalcular valor_total de um pedido
async function recalcularValorTotal(id_pedido) {
  const sql = `
    SELECT 
      SUM((quantidade * preco_unitario) - desconto) AS total
    FROM itenspedido
    WHERE id_pedido = $1
  `;

  const resultado = await db.query(sql, [id_pedido]);
  const total = resultado.rows[0].total || 0;

  await db.query(`
    UPDATE pedidos SET valor_total = $1 WHERE id_pedido = $2
  `, [total, id_pedido]);

  return total;
}

// GET /pedidos
exports.listarPedidos = async (req, res) => {
  try {
    const sql = `
      SELECT p.*, c.nome AS nome_cliente
      FROM pedidos p
      INNER JOIN cliente c ON p.id_cliente = c.id_cliente
      ORDER BY p.data_pedido DESC
    `;
    const resultado = await db.query(sql);
    res.json(resultado.rows);
  } catch (err) {
    console.error('Erro ao listar pedidos:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET /pedidos/:id
exports.getPedidoById = async (req, res) => {
  const { id } = req.params;

  try {
    const pedidoResult = await db.query(`
      SELECT p.*, c.nome AS nome_cliente
      FROM pedidos p
      INNER JOIN cliente c ON p.id_cliente = c.id_cliente
      WHERE p.id_pedido = $1
    `, [id]);

    if (pedidoResult.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Pedido não encontrado' });
    }

    const pedido = pedidoResult.rows[0];

    const itensResult = await db.query(`
      SELECT i.*, pr.nome AS nome_produto
      FROM itenspedido i
      INNER JOIN produtos pr ON i.id_produto = pr.id_produto
      WHERE i.id_pedido = $1
    `, [id]);

    pedido.itens = itensResult.rows;

    res.json(pedido);
  } catch (err) {
    console.error('Erro ao buscar pedido com itens:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET /pedidos/completos
exports.listarPedidosCompletos = async (req, res) => {
  try {
    const pedidosResult = await db.query(`
      SELECT p.*, c.nome AS nome_cliente
      FROM pedidos p
      INNER JOIN cliente c ON p.id_cliente = c.id_cliente
      ORDER BY p.data_pedido DESC
    `);

    const pedidos = pedidosResult.rows;

    const itensResult = await db.query(`
      SELECT i.*, pr.nome AS nome_produto
      FROM itenspedido i
      INNER JOIN produtos pr ON i.id_produto = pr.id_produto
    `);

    const itens = itensResult.rows;

    const pedidosComItens = pedidos.map(pedido => {
      pedido.itens = itens.filter(item => item.id_pedido === pedido.id_pedido);
      return pedido;
    });

    res.json(pedidosComItens);
  } catch (err) {
    console.error('Erro ao listar pedidos completos:', err);
    res.status(500).json({ error: err.message });
  }
};

// POST /pedidos
exports.criarPedido = async (req, res) => {
  const { id_cliente, status, forma_pagamento, observacoes } = req.body;

  try {
    const sql = `
      INSERT INTO pedidos (id_cliente, status, forma_pagamento, observacoes)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const valores = [id_cliente, status || 'Pendente', forma_pagamento, observacoes];
    const resultado = await db.query(sql, valores);

    // valor_total inicial será 0
    const pedidoCriado = resultado.rows[0];
    await recalcularValorTotal(pedidoCriado.id_pedido);

    res.status(201).json(pedidoCriado);
  } catch (err) {
    console.error('Erro ao criar pedido:', err);
    res.status(500).json({ error: err.message });
  }
};

// PUT /pedidos/:id
exports.atualizarPedido = async (req, res) => {
  const { id } = req.params;
  const { id_cliente, status, forma_pagamento, observacoes } = req.body;

  try {
    const sql = `
      UPDATE pedidos
      SET id_cliente = $1,
          status = $2,
          forma_pagamento = $3,
          observacoes = $4
      WHERE id_pedido = $5
      RETURNING *
    `;
    const valores = [id_cliente, status, forma_pagamento, observacoes, id];
    const resultado = await db.query(sql, valores);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Pedido não encontrado para atualizar' });
    }

    // Recalcular valor_total baseado nos itens
    await recalcularValorTotal(id);

    res.json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar pedido:', err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE /pedidos/:id
exports.deletarPedido = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM itenspedido WHERE id_pedido = $1', [id]); // excluir itens antes
    const resultado = await db.query('DELETE FROM pedidos WHERE id_pedido = $1 RETURNING *', [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Pedido não encontrado para deletar' });
    }

    res.json({ mensagem: 'Pedido e itens excluídos com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar pedido:', err);
    res.status(500).json({ error: err.message });
  }
};

// Exportar função auxiliar para outros controllers
exports.recalcularValorTotal = recalcularValorTotal;
