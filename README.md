# Soluciones a los Ejercicios

Este repositorio contiene la solución a los tres ejercicios planteados en el prueba técnica. Cada ejercicio está resuelto en orden según fue planteado en el enunciado. A continuación, se explica cómo ejecutar cada ejercicio.

## Ejercicio 1 - Resolución de problemas con TypeScript

### Descripción

El **Ejercicio 1** consiste en resolver varios problemas utilizando **TypeScript**, como la manipulación de tipos básicos y avanzados, así como la implementación de funciones y clases.

### Cómo ejecutar el Ejercicio 1

Para ejecutar y probar el **Ejercicio 1**, sigue estos pasos:

1. **Instalar dependencias**: Ejecutando el siguiente comando:

   ```bash
   npm install

   ```

2. **Correr Ejercicio**: Una vez que las dependencias estén instaladas, ejecuta el siguiente comando para correr el código:

   ```bash
   npm run start
   ```

## Ejercicio 2 - Consultas SQL

### Descripción

En el **Ejercicio 2** se solicitó realizar consultas SQL basadas en una imagen proporcionada.

### Solución adicional

Para facilitar la ejecución y prueba de las consultas, agregué algunas mejoras adicionales:

- **Docker**: Implementé un archivo `docker-compose.yml` que permite levantar una base de datos **MariaDB** en un contenedor Docker. Esto hace más fácil probar las consultas en un entorno controlado sin necesidad de configurar una base de datos manualmente.
- **Estructura de la base de datos**: El archivo `structure.sql` contiene las instrucciones para crear la estructura de las tablas de acuerdo con la imagen proporcionada, además de insertar algunos datos de prueba.

### Archivos incluidos

1. **`consultas.sql`**:
   - Este archivo contiene las soluciones a las consultas SQL solicitadas en el ejercicio.
2. **`structure.sql`**:

   - Define la estructura de las tablas basadas en la imagen proporcionada e incluye algunos datos de prueba para facilitar las pruebas.

3. **`docker-compose.yml`**:
   - Permite levantar un contenedor con **MariaDB** usando Docker para que puedas probar las consultas directamente.

### Pasos para ejecutar el Ejercicio 2

1. **Levantar la base de datos con Docker**:

   Para facilitar la configuración y prueba de las consultas, se puede levantar la base de datos **MariaDB** con el siguiente comando:

   ```bash
   docker-compose up -d

   ```

2. **Acceder con un motor de base de datos:**:
   Usar un motor de base de datos como DBeaver (es el que yo uso) para conectarte a la base de datos MariaDB que acaba de levantar Docker.

3. **Correr el archivo `structure.sql`:**
   Ejecutar el archivo structure.sql para crear la estructura de las tablas y cargar los datos de prueba.

4. **Ejecutar las consultas:**
   Luego de cargar la estructura, ejecutar las consultas contenidas en el archivo `consultas.sql` en DBeaver o el motor que estés usando.

## Ejercicio 3 - API de Artículos, Marcas y Autenticación

### Descripción

Este ejercicio consiste en la implementación de una API que permite gestionar artículos y marcas, y que incluye un sistema de autenticación basado en JWT. El ejercicio cubre lo siguiente:

1. Crear una API REST que permita manejar artículos y marcas.
2. Implementar autenticación con JWT para acceder a las rutas protegidas.
3. Utilizar **Docker** para crear la base de datos en **MariaDB** y facilitar su configuración.

### Archivos incluidos

1. **`docker-compose.yml`**: Archivo para levantar el contenedor de **MariaDB**.
2. **`datos.sql`**: Contiene algunos artículos y marcas para llenar la base de datos.
3. **Swagger**: Documentación de la API para interactuar con los endpoints y hacer pruebas.

### Paso 1 - Crear el archivo `.env`

Es necesario crear un archivo llamado `.env` en la raíz del proyecto con el siguiente contenido:

```plaintext
DB_ROOT_PASSWORD=root
DB_HOST=localhost
DB_NAME=articulos_db
DB_USER=articulos_user
DB_PASS=articulos_pass
DB_PORT=3306
JWT_SECRET='secretoflexxus'

# Opcionales
PORT=3000
```

### Paso 2 - Levantar la base de datos con Docker

Para facilitar la configuración de la base de datos, se utiliza **Docker** para levantar un contenedor con **MariaDB**.

1. **Levantar la base de datos con Docker**

   Ejecutar el siguiente comando en la terminal para levantar la base de datos utilizando Docker:

   ```bash
   docker-compose up -d
   ```

   Esto creará y levantará un contenedor con MariaDB y configurará la base de datos según lo definido en el archivo docker-compose.yml.

2. **Cargar los datos de prueba**
   Una vez que la base de datos esté levantada, ejecuta el archivo `datos.sql` para cargar algunos datos de prueba en la base de datos (artículos y marcas).

### Paso 3 - Configurar y correr la aplicación

1. **Instalar las dependencias:**

   ```bash
   npm install
   ```

2. **Correr la aplicación:**
   Una vez configurado el archivo `.env`, puedes ejecutar el servidor con el siguiente comando:
   ````bash
   npm run dev
    ```
   Esto iniciará la API en el puerto especificado en el archivo `.env` (por defecto `3000`).
   ````

### Paso 4 - Acceder a la API a través de Swagger

1. **Swagger**:

Una vez que la aplicación esté corriendo, puedes acceder a la documentación interactiva de la API a través de Swagger en:
`bash
   http://localhost:3000/api
    `
Acá se puedem ver todos los endpoints disponibles, incluyendo los de artículos, marcas y la autenticación de usuarios.

2. **Autenticación**:

Para acceder a las rutas protegidas, primero debes iniciar sesión con un usuario. Los datos del usuario admin son los siguientes:

- user: admin
- password: admin123

Se puede probar el login directamente desde Swagger o desde Postman.
