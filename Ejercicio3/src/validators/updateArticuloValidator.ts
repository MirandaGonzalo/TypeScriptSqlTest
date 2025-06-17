import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const updateArticuloSchema = Joi.object({
  nombre: Joi.string().min(3).max(40).required(),
  marca: Joi.number().required(),
  estado: Joi.boolean(),
});

export const validateUpdateArticulo = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = updateArticuloSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  next();
};