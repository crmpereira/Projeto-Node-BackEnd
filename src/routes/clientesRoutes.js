const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clientesController');

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Endpoints para gerenciamento de clientes
 */

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get('/', clienteController.listarClientes);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Busca um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente não encontrado
 */
router.get('/:id', clienteController.getClienteById);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *               id_estado:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cliente atualizado
 *       404:
 *         description: Cliente não encontrado
 */
router.put('/:id', clienteController.atualizarCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Remove um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente removido
 *       404:
 *         description: Cliente não encontrado
 */
router.delete('/:id', clienteController.deletarCliente);

module.exports = router;
