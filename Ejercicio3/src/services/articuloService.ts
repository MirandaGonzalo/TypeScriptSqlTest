import { Op } from "sequelize";
import { Articulo } from "../models/articulo";
import { error } from "console";
import { ArticuloUpdateDTO } from "../dtos/update-articulo.dto";
import { ArticuloCreateDTO } from "../dtos/create-articulo.dto";
import { Marca } from "../models/marca";

interface FiltrosArticulo {
  nombre?: string;
  estado?: string; 
}

export class ArticuloService {
    async getAll(filtros: FiltrosArticulo): Promise<Articulo[]> {
        const where: any = {};
        if (filtros.nombre) {
            where.nombre = { [Op.like]: `%${filtros.nombre}%` };
        }
        if (filtros.estado !== undefined) {
            where.estado = filtros.estado === 'true';
        }
        const articulos = await Articulo.findAll({ 
          where,
          include: [{
              model: Marca,
              attributes: ['nombre'], 
              as: 'marcaRelacionada',
          }]
        });
        return articulos;
    }

    async eliminarArticulo(id: number): Promise<boolean> {
      try {
          const articuloData = await Articulo.findByPk(id);
          if (!articuloData)
            return false;    
          await articuloData.update({ estado: false, fechaModificacion: Date.now()});
          return true;
      } catch {
          console.error('Error al desactivar artículo:', error);
          return false;
      }
    }

    async getById(id: number): Promise<Articulo | null> {
      return await Articulo.findByPk(id);
    }

    async update(id: number, data: ArticuloUpdateDTO): Promise<void> {
        const articulo = await Articulo.findByPk(id);
        if (!articulo) throw new Error('Artículo no encontrado');
        await articulo.update(data);
    }
    async create(data: Partial<Articulo>){
      return await Articulo.create(data);
    }
  
}