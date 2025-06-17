import { Router } from 'express';
import { ArticuloController } from '../controllers/articuloController';
import { auth } from '../middlewares/authMiddleware';
import { validateArticulo } from '../validators/articuloValidator';
import { validateUpdateArticulo } from '../validators/updateArticuloValidator';

const router = Router();
const controller = new ArticuloController();

/**
 * @swagger
 * components:
 *   schemas:
 *     ArticuloDTO:
 *       type: object
 *       required:
 *         - id
 *         - nombre
 *         - marca
 *         - estado
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Camiseta"
 *         marca:
 *           type: string
 *           example: "Nike"
 *         estado:
 *           type: boolean
 *           example: true
 *     ArticuloInsertDTO:
 *       type: object
 *       required:
 *         - nombre
 *         - marca
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Camiseta"
 *         marca:
 *           type: number
 *           example: 2
 *     ArticuloUpdateDTO:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Camiseta"
 *         marca:
 *           type: number
 *           example: 2
 *         estado:
 *           type: boolean
 *           example: true
 *       additionalProperties: false
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Mensaje descriptivo del error"
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Operación exitosa"
 */

/**
 * @swagger
 * /articulos:
 *   get:
 *     summary: Obtener lista de artículos con filtro opcional
 *     description: Retorna una lista de artículos que pueden filtrarse por nombre y estado.
 *     tags:
 *       - Artículos
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Filtro por nombre (coincidencia parcial)
 *         required: false
 *       - in: query
 *         name: estado
 *         schema:
 *           type: boolean
 *         description: Filtro por estado activo/inactivo (true o false)
 *         required: false
 *     responses:
 *       200:
 *         description: Lista de artículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ArticuloDTO'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/',auth,controller.getAll);

/**
 * @swagger
 * /articulos:
 *   post:
 *     summary: Crea un nuevo artículo
 *     description: Inserta un artículo nuevo. Los campos `estado` y `fechaModificacion` se asignan automáticamente.
 *     tags:
 *       - Artículos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticuloInsertDTO'
 *     responses:
 *       201:
 *         description: Artículo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticuloDTO'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/',auth,validateArticulo ,controller.crear);

/**
 * @swagger
 * /articulos/{id}:
 *   put:
 *     summary: Actualiza un artículo existente
 *     description: Actualiza los campos de un artículo por ID. Solo se actualizan los campos que hayan cambiado. El campo `fechaModificacion` se actualiza automáticamente si hay cambios.
 *     tags:
 *       - Artículos
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del artículo a actualizar
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Objeto con los campos a actualizar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticuloUpdateDTO'
 *     responses:
 *       200:
 *         description: Artículo actualizado exitosamente o sin cambios detectados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Artículo actualizado correctamente"
 *                 cambios:
 *                   type: object
 *                   additionalProperties: true
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Artículo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id',auth,validateUpdateArticulo,controller.actualizar);

/**
 * @swagger
 * /articulos/estado/{id}:
 *   put:
 *     summary: Desactivar un artículo (baja lógica)
 *     description: Cambia el campo `estado` a `false` para desactivar el artículo sin eliminarlo físicamente.
 *     tags:
 *       - Artículos
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del artículo a desactivar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Artículo desactivado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Artículo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/estado/:id',auth, controller.delete);

export default router;
