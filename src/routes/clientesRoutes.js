const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clientesController');
const { validateCliente, validateId } = require('../middleware/validation');

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
router.get('/:id', validateId, clienteController.getClienteById);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome completo do cliente
 *               cpf:
 *                 type: string
 *                 description: CPF do cliente (apenas números)
 *               email:
 *                 type: string
 *                 description: Email do cliente
 *               telefone:
 *                 type: string
 *                 description: Telefone do cliente
 *               id_estado:
 *                 type: integer
 *                 description: ID do estado do cliente
 *               ativo:
 *                 type: boolean
 *                 description: Status ativo do cliente
 *                 default: true
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Dados inválidos ou CPF/Email já cadastrado
 */
router.post('/', validateCliente, clienteController.criarCliente);

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
router.put('/:id', validateId, validateCliente, clienteController.atualizarCliente);

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
router.delete('/:id', validateId, clienteController.deletarCliente);

module.exports = router;
