import { error } from "console";
import { Marca } from "../models/marca";


export class MarcaService {
    
    async getAll(): Promise<Marca[]> {
        const marcas = await Marca.findAll();
        return marcas;
    }

    async getById(id: number): Promise<Marca | null> {
      return await Marca.findByPk(id);
    }
}