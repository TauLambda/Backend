// Importación de módulos
import Server from './providers/Server'; // Importa la clase Server desde el archivo Server en el directorio providers

// Importación de módulos de Express y Cors
import express, { Request } from "express"; // Importa express y el tipo Request desde el módulo express
import cors from 'cors'; // Importa el middleware cors

// Importación de controladores
import UserController from "./controllers/UserController"; // Importa el controlador UserController desde el archivo UserController en el directorio controllers
import CardController from './controllers/CardController'; // Importa el controlador CardController desde el archivo CardController en el directorio controllers
import HistoryController from './controllers/HistoryController'; // Importa el controlador HistoryController desde el archivo HistoryController en el directorio controllers
import CarController from './controllers/CarController';

// Creación de una instancia de Server
const app = new Server({
    port:8080,
    middlewares:[
        express.json(),
        express.urlencoded({ extended: true }),
        cors()
    ],
    controllers: [
        UserController.getInstance(),
        CardController.getInstance(),
        HistoryController.getInstance(),
        CarController.getInstance()
],
env:'development'

});

declare global{
    namespace Express{
        interface Request{
        user:string;
        token:string;
        }
    }
}

// Inicialización del servidor
app.init();
