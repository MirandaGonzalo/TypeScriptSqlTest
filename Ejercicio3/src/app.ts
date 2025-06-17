import express, { Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import articuloRouter from './routes/articuloRoutes';
import authRouter from './routes/authRoutes';
import marcaRouter from './routes/marcaRoutes';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const app: Application = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Artículos',
      version: '1.0.0',
      description: 'Documentación de la API',
    },
  },
  apis: ['./src/routes/*.ts'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/articulos', articuloRouter);
app.use('/auth', authRouter);
app.use('/marcas', marcaRouter);

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

app.get('/', (_req, res) => {
  res.redirect('/api');
});

export default app;