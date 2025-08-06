const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidosController');

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Endpoints para gerenciar pedidos
 */

/**
 * @swagger
 * /pedidos/completos:
 *   get:
 *     summary: Listar todos os pedidos com dados completos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos completos retornada com sucesso
 */
router.get('/completos', pedidoController.listarPedidosCompletos);

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Listar todos os pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 */
router.get('/', pedidoController.listarPedidos);

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Obter pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */
router.get('/:id', pedidoController.getPedidoById);

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Criar um novo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_cliente:
 *                 type: integer
 *               id_produto:
 *                 type: integer
 *               quantidade:
 *                 type: number
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 */
router.post('/', pedidoController.criarPedido);

/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Atualizar um pedido existente
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_cliente:
 *                 type: integer
 *               id_produto:
 *                 type: integer
 *               quantidade:
 *                 type: number
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *       404:
 *         description: Pedido não encontrado
 */
router.put('/:id', pedidoController.atualizarPedido);

/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Deletar um pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido deletado com sucesso
 *       404:
 *         description: Pedido não encontrado
 */
router.delete('/:id', pedidoController.deletarPedido);

module.exports = router;
