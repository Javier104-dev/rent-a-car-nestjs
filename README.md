<h1 align='center'>Rent a car back-end | Nest.js</h1>

<h2 align='center'>Diagrama de entidad relación</h2>

<p align='center'>
  <img
    alt='Diagrama de relaciones'
    src='./docs/diagrama-entidad-relacion.png'
  >
</p>

### Especificaciones
- Servidor: http://127.0.0.1:8080
- Versión: 1.0.0
- Autor: Javier Anibal Villca
- Repositorio GitHub: git+https://github.com/Javier104-dev/rent-a-car-nestjs.git

### Tecnologías utilizadas
- **Nest.js v10.0.0**: Framework de desarrollo web basado en Node. js que utiliza TypeScript para proporcionar una estructura de programación sólida y altamente escalable.
- **MySQL**: Sistema de administración de bases de datos relacionales.
- **TypeOrm v0.3.17**: ORM (Object-Relational Mapping), facilita la comunicación entre una aplicación Node.js y la base de datos relacional.
- **Node.js v18.16.0**: Plataforma de ejecución de JavaScript del lado del servidor.
- **ESLint**: Herramienta de linting para mantener un código JavaScript/Node.js consistente y legible.
- **Dotenv**: Carga variables de entorno desde un archivo `.env` en la aplicación.

### Sobre el proyecto
Creación de un servidor para la gestión de un negocio de renta de autos. El servidor cumple con las reglas de una `API RESTful`, se permiten operaciones CRUD y las rutas de acceso a los endpoint son reutilizables.

El proyecto está construido con clases y con una arquitectura en capas para lograr el encapsulamiento y abstracción de todo el código, siguiendo los principios `SOLID` para el desarrollo de aplicaciones.

### MySQL y consultas
En este proyecto usamos MySQL como base de datos, porque necesitamos relacionar varias tablas para lograr el objetivo del proyecto y poder gestionar las reservas correctamente. Las tablas User y Car usan como tabla intermedia a Reservation.

`TypeOrm` nos facilita la comunicación con MySQL, también nos ayuda con la creación y la sincronización de las modelos.

Para la obtención de datos relacionados, o sea traer un registro junto con todos sus registros asociados de otras tablas, se utiliza `relations`(operación `JOIN` en SQL) de TypeOrm, asi podremos relacionar las tablas y obtener, por ejemplo, una reservación con el auto y usuario correspondiente.

Ejemplo:
- **Request**
  - Método: Get.
  - URI: http://127.0.0.1:8080/reservation/1

- **Response**
  ``` json
  {
    "id": 1,
    "startDate": "2023-11-25T02:05:00.000Z",
    "finishDate": "2023-11-30T02:05:00.000Z",
    "pricePerDay": 1000,
    "totalPrice": 5000,
    "carId": 1,
    "userId": 1,
    "createdAt": "2023-11-25T02:05:18.000Z",
    "updatedAt": "2023-11-25T02:05:18.000Z",
    "Car": {
      "id": 1,
      "brand": "Renault",
      "model": "Daster",
      "year": 2021,
      "kms": 6000,
      "color": "black",
      "passengers": 5,
      "price": 1000,
      "img": null,
      "createdAt": "2023-11-25T01:46:09.000Z",
      "updatedAt": "2023-11-25T01:46:09.000Z"
    },
    "User": {
      "id": 1,
      "firstName": "Juan",
      "lastName": "Perez",
      "nationality": "Argentina",
      "address": "Calle 234",
      "phoneNumber": "42425858",
      "email": "juan@gmail.com",
      "birthdate": "1980-01-01T00:00:00.000Z",
      "createdAt": "2023-11-25T01:53:41.000Z",
      "updatedAt": "2023-11-25T01:53:41.000Z"
    }
  }
  ```

### Modulos
Cuenta con tres módulos principales, que a mi parecer son el corazón de la aplicación porque se encargan de la lógica de negocios y comunicación con la base de datos MySQL.

- car
- reservation
- user

Cada uno de ellos contiene la lógica para la creación de sus respectivas `entidades` que son utilizadas en todos los niveles y módulos del proyecto, también se encargan de la creación de los `modelos` de tablas que son necesarios para acceder a las funciones que nos brinda Sequelize y poder convertir nuestras funciones a lenguaje SQL e interactuar con la base de datos de una forma más segura.

<h2 align='center'>Estructura de este proyecto</h2>

(*) Módulo car, reservation o user.

| Ruta                      | Explicación                                                                                                                 |
| :------------------------ | :-------------------------------------------------------------------------------------------------------------------------- |
| src                       | Contiene toda nuestra aplicación                                                                                            |
| src/config/configDb.js    | Configura TypeOrm para su uso dependiendo de la variable de estado NODE_ENV                                                 |
| src/module                | Contiene cada uno de los módulos de nuestra aplicación                                                                      |
| src/module/(*)/dto        | Contiene todos nuestros objetos DTOs que se utilizaran en el módulo                                                         |
| src/module/(*)/controller | Capa encargada de gestionar las solicitudes HTTP del modulo                                                                 |
| src/module/(*)/services   | Lógica de negocio de nuestra aplicación                                                                                     |
| src/module/(*)/repository | Interactúa con la capa de acceso a datos (DAL) y devuelve entidad(es)                                                       |
| src/module/(*)/entity     | Entidad de tabla que se utiliza para las consultas y sincronización con MySQL                                               |
| src/module/(*)/utility    | Clase donde se agrupan los metodos que utilizaremos si queremos manipular los datos antes de enviarlos a la capa repository |
| src/module/(*)/module.ts  | Punto de entrada al módulo                                                                                                  |
| src/app.module.ts         | Punto de entrada de nuestra aplicación                                                                                      |
| src/main.ts               | Este es el archivo que realiza el arranque de la aplicación                                                                 |

<h2 align='center'>Métodos HTTP</h2>

### Métodos utilizados en el proyecto
(*) Módulo car, reservation o user.

| Tipo   | URI                           | Descripción                                                                   |
| ------ | ----------------------------- | ----------------------------------------------------------------------------- |
| GET    | http://127.0.0.1:8080/(*)     | Obtiene todos los registros de la DB                                          |
| GET    | http://127.0.0.1:8080/(*)/:id | Obtiene un registro en específico                                             |
| POST   | http://127.0.0.1:8080/(*)     | Crea o actuliza un registro                                                   |
| DELETE | http://127.0.0.1:8080/car/:id | Únicamente el módulo car tiene el metodo delete. Elimina un registro de la DB |
| USE    | *                             | Página no encontrada                                                          |

<h2 align='center'>Ejemplos de peticiones y métodos</h2>
En cada ejemplo se usará un módulo diferente, ya que todos tienen una estructura y métodos similares.

### Método GET
**Request**
- Ejemplo de URI utilizado
  ```
  http://127.0.0.1:8080/user
  ```

**Response**
- Código **HTTP 200** *Ok*
  ``` json
  [
    {
      "id": 1,
      "firstName": "Juan",
      "lastName": "Perez",
      "nationality": "Argentina",
      "address": "Calle 234",
      "phoneNumber": "42425858",
      "email": "juan@gmail.com",
      "birthdate": "1980-01-01T00:00:00.000Z",
      "createdAt": "2023-11-25T01:53:41.000Z",
      "updatedAt": "2023-11-25T01:53:41.000Z"
    },
  ]
  ```
- Código **HTTP 500**: *Error interno*

### Método GET - Específico
**Request**

- Ejemplo de URI utilizado
  ```
  http://127.0.0.1:8080/car/4
  ```

- Parámetro obligatorio de tipo URL
  - **4**: *(tipo: integer. Indica el código del auto que se quiere obtener)*

**Response**
- Código **HTTP 200** *Ok*
  ``` json
  {
    "id": 4,
    "brand": "Ford",
    "model": "Ranger",
    "year": 2023,
    "kms": 8000,
    "color": "black",
    "passengers": 5,
    "price": 2000,
    "img": null,
    "createdAt": "2023-11-25T01:49:26.000Z",
    "updatedAt": "2023-11-25T01:49:26.000Z"
  }
  ```
- Código **HTTP 400**: *Validation failed (numeric string is expected)*
- Código **HTTP 500**: *No se encontraron autos con el id 4*

### Método POST
**Request**
- URI utilizado
  ```
  http://127.0.0.1:8080/reservation
  ```

- Parámetros requeridos del BODY
  - **"startDate"="2023-11-25T02:05:00.000Z"**: *(tipo: date. Fecha de inicio del alquiler)*
  - **"finishDate"="2023-11-30T02:05:00.000Z"**: *(tipo: date. Fecha final del alquiler)*
  - **"carId"="1"**: *(tipo: integer. Id del auto alquilado)*
  - **"userId"="1"**: *(tipo: integer. Id del cliente registrado)*

**Response**
  - Código **HTTP 200** Ok
    ``` json
    {
      "id": 1,
      "startDate": "2023-11-25T02:05:00.000Z",
      "finishDate": "2023-11-30T02:05:00.000Z",
      "pricePerDay": 1000,
      "totalPrice": 5000,
      "carId": 1,
      "userId": 1,
      "createdAt": "2023-11-25T02:05:18.000Z",
      "updatedAt": "2023-11-25T02:05:18.000Z",
    }
    ```
  - Código **HTTP 400**: *El id no esta definido*
  - Código **HTTP 400**: *No se encontraron usuarios con el id 1*
  - Código **HTTP 400**: *No se encontraron autos con el id 1*

### Método PUT
**Request**
- URI utilizado
  ```
  http://127.0.0.1:8080/car/4
  ```

- Parámetro obligatorio de tipo URL
  - **"id"=4**: *(tipo: integer. Indica el id del auto que se requiere modificar)*

- Parámetros requeridos del BODY
  - **"color"="yellow"**: *(tipo: string. Establece el valor del nombre)*
  - **"passengers"=4**: *(tipo: integer. Establece el valor del número de ocupantes del auto)*
  - **"price"=1500**: *(tipo: float. Establece el precio por dia del auto)*

**Response**
  - Código **HTTP 200** Ok
    ``` json
    {
      "id": 4,
      "brand": "Ford",
      "model": "Ranger",
      "year": 2023,
      "kms": 8000,
      "color": "yellow",
      "passengers": 5,
      "price": 2000,
      "img": null,
      "createdAt": "2023-11-25T01:49:26.000Z",
      "updatedAt": "2023-11-28T05:49:26.000Z"
    }
    ```
  - Código **HTTP 400**: *El id no esta definido*
  - Código **HTTP 400**: *No se encontraron usuarios con el id 1*
  - Código **HTTP 400**: *No se encontraron autos con el id 1*

### Método DELETE
**Request**
- URI utilizado
  ```
  http://127.0.0.1:8080/car/5
  ```

- Parámetro obligatorio de tipo URL
  - **5**: *(tipo: integer. Indica el id del auto que se requiere eliminar)*

**Response**
- Código **HTTP 200** Ok: 
- Código **HTTP 400**: *El id no esta definido*
- Código **HTTP 400**: *No se encontraron autos con el id 4*
- Código **HTTP 400**: *No se puede eliminar el auto con id: 4 porque tiene reservas activas*

<h2 align='center'>Instrucciones de instalación</h2>

### Requerimientos
- IDE - Visual Studio Code v1.84.2
- MySQL v8.0
- Git v2.43.0
- Node.js v20.9.0

### Preparando el ambiente
- Descargar o clonar el repositorio.
- Instalar las dependencias necesarias con el comando `npm install`.
- En la raíz del proyecto crear un archivo `.env`, copiar las variables de entorno que se encuentran en el archivo `.env.dist` y reemplazar su valor siguiendo las indicaciones.
- Correr el comando `npm start` para iniciar el servidor.
- Correr el comando `npm run dev` si se desea modificar el código, este comando usa Nodemon para reiniciar el servidor cada vez que se detecta un cambio.
- Usar la URL base `http://127.0.0.1:8080` para interactuar con el servidor.

---

### Autor
| [<img src='https://avatars.githubusercontent.com/u/105408069?v=4' width=115><br><sub>Javier Anibal Villca</sub>](https://github.com/Javier104-dev) |
| :------------------------------------------------------------------------------------------------------------------------------------------------: |
