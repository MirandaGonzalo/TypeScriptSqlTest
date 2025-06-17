// src/server.ts
import app from './app';
import sequelize from './config/database';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); 
    console.log('Base de datos conectada');

    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
      console.log(`Swagger en http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
})();