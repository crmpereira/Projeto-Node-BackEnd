const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estadosController');

/**
 * @swagger
 * tags:
 *   name: Estados
 *   description: Operações relacionadas aos estados
 */

/**
 * @swagger
 * /estados:
 *   get:
 *     summary: Lista todos os estados
 *     tags: [Estados]
 *     responses:
 *       200:
 *         description: Lista de estados
 */
router.get('/', estadoController.listarEstados);

/**
 * @swagger
 * /estados/{id}:
 *   get:
 *     summary: Retorna um estado específico pelo ID
 *     tags: [Estados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do estado
 *     responses:
 *       200:
 *         description: Estado encontrado
 *       404:
 *         description: Estado não encontrado
 */
router.get('/:id', estadoController.getEstadoById);

/**
 * @swagger
 * /estados:
 *   post:
 *     summary: Cria um novo estado
 *     tags: [Estados]
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
 *     responses:
 *       201:
 *         description: Estado criado com sucesso
 */
router.post('/', estadoController.criarEstado);

/**
 * @swagger
 * /estados/{id}:
 *   put:
 *     summary: Atualiza um estado existente
 *     tags: [Estados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do estado
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
 *     responses:
 *       200:
 *         description: Estado atualizado com sucesso
 *       404:
 *         description: Estado não encontrado
 */
router.put('/:id', estadoController.atualizarEstado);

/**
 * @swagger
 * /estados/{id}:
 *   delete:
 *     summary: Exclui um estado pelo ID
 *     tags: [Estados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do estado
 *     responses:
 *       204:
 *         description: Estado excluído com sucesso
 *       404:
 *         description: Estado não encontrado
 */
router.delete('/:id', estadoController.deletarEstado);

module.exports = router;
