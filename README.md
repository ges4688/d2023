# Backend
  

<!-- PROYECTO -->
## Proyectos
 

<p align="right">(<a href="#top">back to top</a>)</p>

## Equipo de trabajo
Angel Leonardo
Wang Jian
Huber Matias
Salvia Gonzalo Ezequiel

### Prerequisitos
Tener instalado node.js

### Setup

Al bajar el código a su maquina ( ya sea descargandolo o realizando un pull del repositorio git) abrir una terminal y pararse en la ubicacion donde se encuentra el archivo package.json y ejecutar las instrucciones

```shell
$ npm install
```
Esta instrucción instalará todos los paquetes necesarios en el proyecto backend.

Una vez finalizada la instalación para levantar la app ejecutar

```shell
$ node app.js
```
En caso que precise implementar una libreria extra no olvide efectuar nuevamente el "npm install"
 

## Tests

Para correr pruebas con postman es necesario que el body sea pasado como un json y dependiendo del endpoint a probar setear en el request el header x-access-token con el token generado luego del login.

Estructura modelo de la prueba local http://localhost:4000/api/{base_endpoint}/{endpoint}
Ejemplo 
http://localhost:4000/api/users/registration


##Disclaimer: Asumimos que el endpoint logout no es necesario de implementar pues del lado del cliente con la destruccion de la cookie/localstorage client side que persiste el token no es necesaria la implementacion. 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
