import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();
const controller = new AuthController();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     description: Ingresar al sistema.
 *     tags:
 *       - Auth
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Usuario logueado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.post('/login', controller.login) ;

export default router;