import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const articuloSchema = Joi.object({
  nombre: Joi.string().min(3).max(40).required(),
  marca: Joi.number().required(),
});

export const validateArticulo = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = articuloSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  next();
};