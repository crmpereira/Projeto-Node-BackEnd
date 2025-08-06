const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itensPedidoController');

/**
 * @swagger
 * tags:
 *   name: ItensPedido
 *   description: Gerenciamento de Itens dos Pedidos
 */

/**
 * @swagger
 * /itenspedido:
 *   get:
 *     summary: Lista todos os itens de pedidos
 *     tags: [ItensPedido]
 *     responses:
 *       200:
 *         description: Lista de itens retornada com sucesso
 */
router.get('/', itemController.listarItens);

/**
 * @swagger
 * /itenspedido/{id}:
 *   get:
 *     summary: Obtém um item de pedido pelo ID
 *     tags: [ItensPedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item
 *     responses:
 *       200:
 *         description: Item encontrado
 *       404:
 *         description: Item não encontrado
 */
router.get('/:id', itemController.getItemById);

/**
 * @swagger
 * /itenspedido/pedido/{id_pedido}:
 *   get:
 *     summary: Lista todos os itens de um pedido específico
 *     tags: [ItensPedido]
 *     parameters:
 *       - in: path
 *         name: id_pedido
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Itens retornados com sucesso
 */
router.get('/pedido/:id_pedido', itemController.getItensPorPedido);

/**
 * @swagger
 * /itenspedido:
 *   post:
 *     summary: Cria um novo item de pedido
 *     tags: [ItensPedido]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_pedido:
 *                 type: integer
 *               id_produto:
 *                 type: integer
 *               quantidade:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 */
router.post('/', itemController.criarItem);

/**
 * @swagger
 * /itenspedido/{id}:
 *   put:
 *     summary: Atualiza um item de pedido
 *     tags: [ItensPedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantidade:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *       404:
 *         description: Item não encontrado
 */
router.put('/:id', itemController.atualizarItem);

/**
 * @swagger
 * /itenspedido/{id}:
 *   delete:
 *     summary: Deleta um item de pedido
 *     tags: [ItensPedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item
 *     responses:
 *       200:
 *         description: Item deletado com sucesso
 *       404:
 *         description: Item não encontrado
 */
router.delete('/:id', itemController.deletarItem);

module.exports = router;
