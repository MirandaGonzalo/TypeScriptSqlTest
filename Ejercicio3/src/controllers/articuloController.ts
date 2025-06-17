import { Request, Response } from 'express';
import { ArticuloService } from '../services/articuloService';
import { ArticuloDTO } from '../dtos/response-articulo.dto';
import { ArticuloUpdateDTO } from '../dtos/update-articulo.dto';
import { getCamposModificados } from '../utils/utils';
import { ArticuloCreateDTO } from '../dtos/create-articulo.dto';
import { MarcaService } from '../services/marcaService';

const articuloService = new ArticuloService();
const marcaService = new MarcaService();

export class ArticuloController {

    async getAll(req: Request, res: Response): Promise<void> {
      try {
          const articulos = await articuloService.getAll(req.query);
          const articulosDTO: ArticuloDTO[] = articulos.map(a => ({
              id: a.id,
              nombre: a.nombre,
              fechaModificacion: a.fechaModificacion,
              marca: a.marca,
              estado: a.estado,
              nombre_marca: a.marcaRelacionada.nombre
          }));
          res.json(articulosDTO);
      } catch (error) {
          res.status(500).json({ error: 'Error al obtener los artículos.' });
      }
    }
    async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)){
          res.status(404).json({ error: 'Artículo seleccionado inválido.' });
      }
      const resultado = await articuloService.eliminarArticulo(id);
      if (resultado) {
          res.json({ mensaje: 'Artículo eliminado correctamente.' });
      } else {
          res.status(404).json({ error: 'Artículo no encontrado.' });
      }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el artículo.' });
    }
  }
  async actualizar(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const nuevoDTO: ArticuloUpdateDTO = req.body;
      const articulo = await articuloService.getById(id);
      if (!articulo) {
          res.status(404).json({ message: 'Artículo no encontrado' });
          return;
      }
      if (nuevoDTO.marca != null){
          const existeMarca = await marcaService.getById(nuevoDTO.marca);
          if (!existeMarca){
              res.status(400).json({error: 'La marca ingresada no existe.'});
          }
      }
      const cambios = getCamposModificados(articulo.toJSON(), nuevoDTO);
      if (Object.keys(cambios).length === 0) {
          res.status(200).json({ message: 'No hay cambios para aplicar.' });
          return;
      }
      cambios.fechaModificacion = new Date();
      await articuloService.update(id, cambios);
      res.status(200).json({ message: 'Artículo actualizado con éxito.', cambios });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el artículo.' });
    }
  }

  async crear(req: Request, res: Response): Promise<void> {
    try {
        const { nombre, marca }: ArticuloCreateDTO = req.body;

        if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
            res.status(400).json({ error: 'El campo nombre es obligatorio y debe contener texto.' });
            return;
        }
        if (!marca || typeof marca !== 'number' || marca <= 0) {
            res.status(400).json({ error: 'El campo marca es obligatorio y debe contener una referencia a una Marca.' });
            return;
        }      
        const articuloData = {
            nombre: nombre.trim(),
            marca: marca,
            estado: true, 
            fechaModificacion: new Date() 
        };
        const existeMarca = await marcaService.getById(marca);
        if (!existeMarca){
            res.status(400).json({error: 'La marca ingresada no existe.'});
        }
        const nuevoArticulo = await articuloService.create(articuloData);
        res.status(201).json(nuevoArticulo);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el artículo.' });
    }
  }
}