const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itensPedidoController');
const { validateItemPedido, validateId } = require('../middleware/validation');

/**
 * @swagger
 * tags:
 *   name: ItensPedido
 *   description: Gerenciamento de Itens dos Pedidos
 */

/**
 * @swagger
 * /itens-pedido:
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
 * /itens-pedido/{id}:
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
router.get('/:id', validateId, itemController.getItemById);

/**
 * @swagger
 * /itens-pedido/pedido/{id_pedido}:
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
router.get('/pedido/:id_pedido', validateId, itemController.getItensPorPedido);

/**
 * @swagger
 * /itens-pedido:
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
router.post('/', validateItemPedido, itemController.criarItem);

/**
 * @swagger
 * /itens-pedido/{id}:
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
router.put('/:id', validateId, validateItemPedido, itemController.atualizarItem);

/**
 * @swagger
 * /itens-pedido/{id}:
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
router.delete('/:id', validateId, itemController.deletarItem);

module.exports = router;
