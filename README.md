# Api Books - TP NodeJS

Pequeña aplicación hecha con NodeJS con el framework de express y el orm de sequelize consumiendo una base de datos en sqllite





## Tecnologias usadas

**Server:** Node, Express, Sequelize, SQL Lite


## Variables de entornos

Para ejecutar este proyecto, deberá agregar las siguientes variables de entorno a su archivo .env en la raiz del proyecto

`TZ`

`API_PORT`

`JWT_SECRET`

`NODE_ENV`

### Pre-requisitos 📋

Para poder ejecutar bien este proyecto se necesita tener instalado la version de node LTS

```
Node v18.16.1. Se descarga en: https://nodejs.org/en
```
## Ejecutar localmente el servidor

Clonar el proyecto

```bash
  git clone https://github.com/FabrizioFerroni/api-books
```

Ir al directorio del proyecto

```bash
  cd api-books
```

Instalar dependencias

```bash
  npm install
```
Iniciar el servidor

```bash
  npm run dev
```


## Mapa de la aplicación

Así se encuentra organizado el proyecto en cuestión.

```
📁 api-books/
├───📁 app/
│   ├───📁 config/
│   │   └───📄 db.config.js
│   ├───📁 controllers/
│   │   ├───📄 auth.controller.js
│   │   ├───📄 book.controller.js
│   │   ├───📄 library.controller.js
│   │   └───📄 user.controller.js
│   ├───📁 helpers/
│   │   └───📄 validate.helpers.js
│   ├───📁 middleware/
│   │   ├───📄 verifyAuth.js
│   │   └───📄 verifyISBN.js
│   ├───📁 models/
│   │   ├───📄 book.model.js
│   │   ├───📄 library.model.js
│   │   ├───📄 relations.model.js
│   │   └───📄 user.model.js
│   ├───📁 routes/
│   │   ├───📄 auth.routes.js
│   │   ├───📄 book.routes.js
│   │   ├───📄 library.routes.js
│   │   └───📄 user.routes.js
│   ├───📁 services/
│   │   ├───📄 auth.services.js
│   │   ├───📄 book.services.js
│   │   ├───📄 library.services.js
│   │   └───📄 user.services.js
│   └───📁 validations/
│       ├───📄 book.validation.js
│       ├───📄 library.validation.js
│       └───📄 user.validation.js
├───📄 .env.example
├───📄 package-lock.json
├───📄 package.json
├───📄 README.md
└───📄 server.js
```

Se pasa a detallar cada archivo para que fue creado y que hace.

* ***app/config/db.config.js*** 
  * Archivo para importar librerias de sequelize para hacer la configuracion a la base de datos
* ***app/controllers/auth.controller.js***
  * Archivo donde se importa el service de auth y se crean las funciones de: 
    * ***Login***: donde es una funcion que se comunica con el service pasandole el body para que pueda loguearse el usuario.
    * ***Register*** : se le pasa al service el body para crear un nuevo usuario.
    * ***Refresh token***: funcion para refrescar el token.
    
* ***app/controllers/book.controller.js***
  * Archivo donde se importa el service de book y se crean las funciones de:
    * ***getAllCont***: donde es una funcion que se comunica con el service para obtener todos los registros de libros.
    * ***getAllDelCont***: intermediario entre la ruta y el service para obtener todos los registros de libros que fueron borrados.
    * ***getByIdCont***: intermediario entre la ruta y el service para obtener un registro de un libro buscado por su id.
    * ***createCont***: intermediario entre la ruta y el service para crear un nuevo libro donde se le envia el req.body al service
    * ***updateCont***: intermediario entre la ruta y el service para actualizar un libro por su id donde se le envia el req.params y req.body al service
    * ***removeCont***: intermediario entre la ruta y el service para borrar un libro por su id donde se le envia el req.params al service
    * ***restoreCont***: intermediario entre la ruta y el service para restaurar un libro por su id que fue borrado donde se le envia el req.params al service.
* ***app/controllers/library.controller.js***
   * Archivo donde se importa el service de library y se crean las funciones de:
     * ***getAllContLib***: donde es una funcion que se comunica con el service para obtener todos los registros de las bibliotecas.
     * ***getAllDelContLib***: intermediario entre la ruta y el service para obtener todos los registros de las bibliotecas que fueron borradas.
     * ***getByIdContLib***: intermediario entre la ruta y el service para obtener un registro de una biblioteca buscada por su id.
     * ***createContLib***: intermediario entre la ruta y el service para crear una nueva biblioteca donde se le envia el req.body al service
     * ***updateContLib***: intermediario entre la ruta y el service para actualizar una biblioteca por su id donde se le envia el req.params y req.body al service
     * ***removeContLib***: intermediario entre la ruta y el service para borrar una biblioteca por su id donde se le envia el req.params al service
     * ***restoreContLib***: intermediario entre la ruta y el service para restaurar una biblioteca por su id que fue borrado donde se le envia el req.params al service.
* ***app/controllers/user.controller.js***
   * Archivo donde se importa el service de user y se crean las funciones de:
     * ***getAllUsersCont***: donde es una funcion que se comunica con el service para obtener todos los registros de los usuarios.
* ***helpers/validate.helpers.js***
  * Archivo que crea un helper para un middleware de validaciones
* ***app/middleware/verifyAuth.js***
  * Archivo donde se hace una funcion para usar de middleware en las rutas para saber si ese endpoint se le ha pasado un token y asi deja pasar o no si no esta logueado
* ***app/middleware/verifyISBN.js***
  * Archivo donde se hace una funcion para usar de middleware para pasar en las rutas donde verifica si el isbn ingresado ya esta registrado en la base de datos, si esta arroja un error y si no esta sigue con la solicitud.

* ***app/models/book.model.js***
  * Archivo donde se arma el modelo de book para que este cree una tabla llamada `books` en la base de datos.

* ***app/models/library.model.js***
  * Archivo donde se arma el modelo de library para que este cree una tabla llamada `libraries` en la base de datos.

* ***app/models/relations.model.js***
  * Archivo donde se configuran las relaciones 1:N entre library y book.

* ***app/models/user.model.js***
  * Archivo donde se arma el modelo de user para que este cree una tabla llamada `users` en la base de datos.

* ***app/routes/auth.routes.js***
  * Archivo donde se definen todas las rutas para la autenticacion del usuario y se pasan los middlewares y demas

* ***app/routes/book.routes.js***
  * Archivo donde se definen todas las rutas para los libros y se pasan los middlewares y demas

* ***app/routes/library.routes.js***
  * Archivo donde se definen todas las rutas para las bibliotecas y se pasan los middlewares y demas

* ***app/routes/user.routes.js***
  * Archivo donde se definen todas las rutas para los usuarios y se pasan los middlewares y demas

* ***app/services/auth.services.js***
  * Archivo donde se importa el modelo de user y se crean las funciones de: 
    * ***registerUser***:  es el encargado de obtener los datos que envia el cliente y crear un nuevo registro en la bd.
    * ***loginUser***: el encargado de obtener todos los datos que envia el cliente, verificar si el usuario y clave coincide y le asigna un token para que pueda utilizar las rutas que son protegidas.
    * ***refreshTokenUser***: es el encargado de obtener el token viejo y renovar el token asi le da mas tiempo de validez al token para realizar peticiones.
* ***app/services/book.services.js***
  * Archivo donde se importa el modelo de book y se crean las funciones de: 
    * ***getAll***: encargado de obtener todos los registros que hay en la tabla `books` de la base de datos.
    * ***getAllDeleted***: encargado de obtener todos los registros que fueron borrados que hay en la tabla `books` de la base de datos.
    * ***getById***: encargado de obtener un registro buscado por un id que hay en la tabla `books` de la base de datos.
    * ***create***: es el encargado de recibir todos los campos que vienen del controler y crear un nuevo libro en la tabla `books` de la base de datos.
    * ***update***: es el encargado de recibir todos los campos que vienen del controler y actualizar un libro por su id en la tabla `books` de la base de datos.
    * ***remove***: es el encargado de recibir todos los campos que vienen del controler y borrar un libro por su id en la tabla `books` de la base de datos.
    * ***restore***: es el encargado de recibir todos los campos que vienen del controler y restaurar un libro por su id que fue borrado previamente en la tabla `books` de la base de datos.
* ***app/services/library.services.js***
  * Archivo donde se importa el modelo de book y se crean las funciones de: 
    * ***getAll***: encargado de obtener todos los registros que hay en la tabla `libraries` de la base de datos.
    * ***getAllDeleted***: encargado de obtener todos los registros que fueron borrados que hay en la tabla `libraries` de la base de datos.
    * ***getById***: encargado de obtener un registro buscado por un id que hay en la tabla `libraries` de la base de datos.
    * ***create***: es el encargado de recibir todos los campos que vienen del controler y crear una nueva biblioteca en la tabla `libraries` de la base de datos.
    * ***update***: es el encargado de recibir todos los campos que vienen del controler y actualizar una biblioteca por su id en la tabla `libraries` de la base de datos.
    * ***remove***: es el encargado de recibir todos los campos que vienen del controler y borrar una biblioteca por su id en la tabla `libraries` de la base de datos.
    * ***restore***: es el encargado de recibir todos los campos que vienen del controler y restaurar una biblioteca por su id que fue borrado previamente en la tabla `libraries` de la base de datos.
* ***app/validations/book.validation.js***
  * Archivo donde se pasan un par de validaciones como middleware para que el cliente no mande en blanco ningun dato importante.
* ***app/validations/library.validation.js***
  * Archivo donde se pasan un par de validaciones como middleware para que el cliente no mande en blanco ningun dato importante.
* ***app/validations/user.validation.js***
  * Archivo donde se pasan un par de validaciones como middleware para que el cliente no mande en blanco ningun dato importante.
* ***package.json***: 
  * Archivo donde se declaran los scripts y librerias a utilizar, aca se fija npm que paquete instalar del proyecto
* ***server.js***
  * Archivo donde se importan todos los modelos y ruta y donde tambien se inicializa el server configurandole su puerto especifico. 


## Referencia de la API

#### Obtener todas las bibliotecas

```http
  GET /api/library
```

#### Obtener todas las bibliotecas que fueron borradas

```http
  GET /api/library/deleted
```

#### Obtener una biblioteca por su id

```http
  GET /api/library/:id
```

| Parametro | Tipo     | Donde? | Descripcion                       |
| :-------- | :------- | :----- | :-------------------------------- |
| `id` | `number`| parametro | **Requerido**. ID de la biblioteca a buscar |

#### Crear una nueva biblioteca

```http
POST /api/library
```

Se le requiere pasar estos parametros por body:

```json
{
    "name": "El librote",
    "location": "Av. Libertador 1460",
    "phone": "3514563344"
}
```

Ademas por la cabezera header de `Authorization` se le tiene que pasar el token que obtuvieron al iniciar sesion.

| Parametro | Tipo     | Donde? | Descripcion                       |
| :-------- | :------- | :----- | :-------------------------------- |
| `name`      | `string`| body | **Requerido**. Nombre de la biblioteca. Eg: El Librote |
| `location`      | `string` |body | **Requerido**. Dirección física de la biblioteca. Eg: Av. Libertador 1460 |
| `phone`      | `string` |body | **Requerido**. Número de teléfono. Eg: 3514563344 |


#### Actualizar una biblioteca por su id

```http
PUT /api/library/:id
```

Se le requiere pasar estos parametros por body:

```json
{
    "name": "El librote",
    "location": "Av. Libertador 1460",
    "phone": "3514563344"
}
```

Ademas por la cabezera header de `Authorization` se le tiene que pasar el token que obtuvieron al iniciar sesion.

| Parametro | Tipo     | Donde? | Descripcion                       |
| :-------- | :------- | :----- | :-------------------------------- |
| `id` | `number`| parametro | **Requerido**. ID de la biblioteca a actualizar |
| `name`      | `string`| body | **Requerido**. Nombre de la biblioteca. Eg: El Librote |
| `location`      | `string` |body | **Requerido**. Dirección física de la biblioteca. Eg: Av. Libertador 1460 |
| `phone`      | `string` |body | **Requerido**. Número de teléfono. Eg: 3514563344 |


#### Borrar una biblioteca por su id

```http
DELETE /api/library/:id
```
Se le tiene que pasar por la cabezera header de `Authorization` el token que obtuvieron al iniciar sesion.

| Parametro | Tipo     | Donde? | Descripcion                       |
| :-------- | :------- | :----- | :-------------------------------- |
| `id` | `number`| parametro | **Requerido**. ID de la biblioteca a eliminar |

#### Restaurar una biblioteca por su id

```http
POST /api/library/:id/restore
```

Se le tiene que pasar por la cabezera header de `Authorization` el token que obtuvieron al iniciar sesion.

| Parametro | Tipo     | Donde? | Descripcion                       |
| :-------- | :------- | :----- | :-------------------------------- |
| `id` | `number`| parametro | **Requerido**. ID de la biblioteca a restaurar |

* ***

#### Obtener todos los libros

```http
  GET /api/book
```

#### Obtener todos los libros que fueron borradas

```http
  GET /api/book/deleted
```

#### Obtener un libro por su id

```http
  GET /api/book/:id
```

| Parametro | Tipo     | Donde? | Descripcion                       |
| :-------- | :------- | :----- | :-------------------------------- |
| `id` | `number`| parametro | **Requerido**. ID del libro a buscar |

#### Crear un nuevo libro

```http
POST /api/book
```

Se le requiere pasar estos parametros por body:

```json
{
    "isbn": "978-987-800-178-4",
    "title": "Harry Potter y la piedra filosofal",
    "author": "Rowling, J. K.",
    "year": "2023",
    "libraryId": 1
}
```

Ademas por la cabezera header de `Authorization` se le tiene que pasar el token que obtuvieron al iniciar sesion.

| Parametro | Tipo     | Donde? | Descripcion                       |
| :-------- | :------- | :----- | :-------------------------------- |
| `isbn`      | `string`| body | **Requerido**. Este identificador es único en todo el mundo y representa el libro, la versión del autor y el año de edición. Eg: 978-987-800-178-4 |
| `title`      | `string` |body | **Requerido**. Título del libro Eg: Harry Potter y la piedra filosofal |
| `author`      | `string` |body | **Requerido**. Autor del libro. Eg: Rowling, J. K. |
| `year`      | `string` |body | **Requerido**. Año de edición del libro. Eg: 2023 |
| `libraryId`      | `number` |body | **Requerido**. El identificador de la librería en donde este libro se encuentra. Previamente tiene que ser creado. Eg: 1 |


#### Actualizar un libro por su id

```http
PUT /api/book/:id
```

Se le requiere pasar estos parametros por body:

```json
{
    "isbn": "978-987-800-178-4",
    "title": "Harry Potter y la piedra filosofal",
    "author": "Rowling, J. K.",
    "year": "2023",
    "libraryId": 1
}
```

Ademas por la cabezera header de `Authorization` se le tiene que pasar el token que obtuvieron al iniciar sesion.

| Parametro | Tipo     | Donde? | Descripcion                       |
| :-------- | :------- | :----- | :-------------------------------- |
| `id` | `number`| parametro | **Requerido**. ID del libro a actualizar |
| `isbn` | `string`| body | **Requerido**. Este identificador es único en todo el mundo y representa el libro, la versión del autor y el año de edición. Eg: 978-987-800-178-4 |
| `title`      | `string` |body | **Requerido**. Título del libro Eg: Harry Potter y la piedra filosofal |
| `author`      | `string` |body | **Requerido**. Autor del libro. Eg: Rowling, J. K. |
| `year`      | `string` |body | **Requerido**. Año de edición del libro. Eg: 2023 |
| `libraryId`      | `number` |body | **Requerido**. El identificador de la librería en donde este libro se encuentra. Previamente tiene que ser creado. Eg: 1 |


#### Borrar un libro por su id

```http
DELETE /api/book/:id
```

Se le tiene que pasar por la cabezera header de `Authorization` el token que obtuvieron al iniciar sesion.

| Parametro | Tipo     | Donde? | Descripcion                       |
| :-------- | :------- | :----- | :-------------------------------- |
| `id` | `number`| parametro | **Requerido**. ID del libro a eliminar |

#### Restaurar un libro por su id

```http
POST /api/book/:id/restore
```

Se le tiene que pasar por la cabezera header de `Authorization` el token que obtuvieron al iniciar sesion.

| Parametro | Tipo     | Donde? | Descripcion                       |
| :-------- | :------- | :----- | :-------------------------------- |
| `id` | `number`| parametro | **Requerido**. ID del libro a restaurar |

* ***
#### Registrar un nuevo usuario

```http
POST /auth/register
```

Se le requiere pasar estos parametros por body:

```json
{
    "name": "John",
    "lastname": "Doe",
    "username": "johndoe",
    "password": "Pepito2023#",
}
```

| Parametro | Tipo     | Donde? | Descripcion                       |
| :-------- | :------- | :----- | :-------------------------------- |
| `name`      | `string`| body | **Requerido**. Nombre del usuario Eg: John |
| `lastname`      | `string` |body | **Requerido**. Apellido del usuario. Eg: Doe |
| `username`      | `string` |body | **Requerido**. Usuario que se va a usar para autenticarse en el sistema. Eg: johndoe |
| `password`      | `string` |body | **Requerido**. Contraseña que se va a usar para autenticarse en el sistema. Eg: Pepito2023# |

#### Iniciar sesion en el sistema

```http
POST /auth/login
```

Se le requiere pasar estos parametros por body:

```json
{
    "username": "johndoe",
    "password": "Pepito2023#",
}
```

| Parametro | Tipo     | Donde? | Descripcion                       |
| :-------- | :------- | :----- | :-------------------------------- |
| `username`      | `string` |body | **Requerido**. Usuario que se va a usar para autenticarse en el sistema. Eg: johndoe |
| `password`      | `string` |body | **Requerido**. Contraseña que se va a usar para autenticarse en el sistema. Eg: Pepito2023# |

#### Renovar el token de sesion

```http
POST /auth/refresh
```

Se le requiere pasar estos parametros por body:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

Se le tiene que pasar por la cabezera header de `Authorization` el token que obtuvieron al iniciar sesion.

| Parametro | Tipo     | Donde? | Descripcion                       |
| :-------- | :------- | :----- | :-------------------------------- |
| `username`      | `string` |body | **Requerido**. Token que le habia dado el login cuando inicio sesion. Eg: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c |

* ***

#### Obtener todos los usuarios

```http
  GET /api/users
```


## Quien desarrollo esta api

- [@FabrizioFerroni](https://www.github.com/FabrizioFerroni)
