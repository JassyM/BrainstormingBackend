# Brainstorming Backend


Aplicación API en la que usuarios pueden agregar ideas, comentar y votar positiva o negativamente las ideas. Se realiza pruebas unitarias con Jest. Se implementa Docker, documentación con Swagger, Travis y Heroku.


De acuerdo a la arquitectura que se está siguiendo:
- Repository: se encarga de devolver la información tal cual está en base de datos.
- Service: se encarga de aplicarle lógica de negocio e incluso algún formato.

## Pasos

* Tener instalado Docker

* Instalar dependencias:
```
npm install
```

* Para correr las pruebas

```
npm run test
```

* Ejecutar sin Docker

```
npm run start
```

* Ejecutar con Docker
```
docker-compose up --build
```

## Endpoints

* Crear usuario
> v1/api/auth/signup

* Iniciar sesión
> v1/api/auth/signin

* Consultar documentación de los demás endpoints
> /api-docs

## Dependencias:

* express
* mongoose
* mongoose-autopopulate
* cors
* awilix
* bcryptjs
* compression
* express-async-errors
* helmet
* jsonwebtoken
* memory-cache
* swagger-ui-express

## Dependencias de desarrollo:

* dotenv
* nodemon
* jest
* mockingoose