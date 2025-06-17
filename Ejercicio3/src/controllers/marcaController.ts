import { Request, Response } from 'express';
import { MarcaService } from '../services/marcaService';
import { MarcaDTO } from '../dtos/response-marca.dto';

const marcaService = new MarcaService();

export class MarcaController {

    async getAll(req: Request, res: Response): Promise<void> {
      try {
          const marcas = await marcaService.getAll();
          const marcasDto: MarcaDTO[] = marcas.map(m => ({
            id: m.id,
            nombre: m.nombre,
          }));
          res.json(marcasDto);
      } catch (error) {
          res.status(500).json({ error: 'Error al obtener las marcas.' });
      }
    }
}