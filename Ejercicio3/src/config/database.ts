import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Articulo } from '../models/articulo';
import { Marca } from '../models/marca';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mariadb',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  models: [Articulo, Marca], 
  logging: false,
});

export default sequelize;