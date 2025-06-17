import { Router } from 'express';
import { MarcaController } from '../controllers/marcaController';
import { auth } from '../middlewares/authMiddleware';

const router = Router();
const controller = new MarcaController();

/**
 * @swagger
 * components:
 *   schemas:
 *     MarcaDTO:
 *       type: object
 *       required:
 *         - id
 *         - nombre
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Nike"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Se ha producido un error"
 */

/**
 * @swagger
 * /marcas:
 *   get:
 *     summary: Obtener lista de marcas
 *     description: Retorna una lista de todas las marcas registradas en el sistema.
 *     tags:
 *       - Marcas
 *     responses:
 *       200:
 *         description: Lista de marcas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MarcaDTO'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/',auth,controller.getAll);
export default router;
