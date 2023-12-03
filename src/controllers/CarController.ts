import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from '../models';
import fetch from "node-fetch";

class CarController extends AbstractController{
    protected validateBody(type: any) {
        throw new Error("Method not implemented.");
    }

    //Singleton
    //Atributo de clase
    private static instance:CarController;

    //Método de clase
    public static getInstance():AbstractController{
        if(this.instance){
            return this.instance;
        }
        this.instance = new CarController('car');
        return this.instance;
    }
    
    protected initRoutes(): void {
        this.router.get('/readCars',this.getReadCars.bind(this));
        this.router.post('/createCar',this.postCreateCar.bind(this));
        this.router.get('/readCar',this.getReadCar.bind(this));
        this.router.get('/updateCar',this.updateCar.bind(this));
        this.router.get('/deleteCar',this.deleteCar.bind(this));
        this.router.post('/userCars',this.getReadCarByUser.bind(this));
        //Todas las rutas que necesite su controlador
    }

    // Método para obtener todos los carros
    private async getReadCars(req:Request,res:Response){
        try{
            let carros= await db["carro"].findAll()
            console.log("Carros:", carros);
            res.send(carros);
        }catch(error){
            if (error instanceof Error){
                res.status(500).send({ message: error.message });
            }else{
                res.status(500).send({ message: "Error" });
            }
        }
    }

    // Método para crear un nuevo carro
    private async postCreateCar(req:Request,res:Response){
        try{
            console.log(req.body);
            await db["carro"].create(req.body);
            console.log("Registro exitoso");
            res.status(200).send("Registro exitoso");
        }catch(err:any){
            console.log("Error")
            res.status(500).send("Error fatal:" +err); 
        }
    }

    // Método para obtener un carro por su placa
    private async getReadCar(req: Request, res: Response) {
        try {
            // Suponiendo que se tiene un parámetro "Placa" en la solicitud
            const carPlaca = req.body.Placa;

            // Verificar si carPlaca está indefinido o nulo
            if (!carPlaca) {
                res.status(400).send({ message: "Falta el parámetro Placa" });
                return;
            }

            // Obtener un solo carro por su placa de la tabla "carro"
            const car = await db["carro"].findOne({ where: { Placa: carPlaca } });

            if (!car) {
                // Si no se encuentra el carro con la placa especificada, devolver un estado 404
                res.status(404).send({ message: "Carro no encontrado" });
                return;
            }

            // Registrar el carro obtenido en la consola para depuración
            console.log("Carro:", car);

            // Enviar el carro obtenido como respuesta
            res.send(car);
        } catch (error) {
            // Manejar errores
            if (error instanceof Error) {
                // Si el error es una instancia de la clase Error, enviar el mensaje de error
                res.status(500).send({ message: error.message });
            } else {
                // Si no es una instancia de Error (caso inesperado), enviar un mensaje de error genérico
                res.status(500).send({ message: "Error" });
            }
        }
    }

    // Método para obtener carros por usuario
    private async getReadCarByUser(req: Request, res: Response) {
        try {
            // Suponiendo que se tiene un parámetro "ID_usuario" en la solicitud
            const userID = req.body.ID_usuario;

            // Verificar si userID está indefinido o nulo
            if (!userID) {
                res.status(400).send({ message: "Falta el parámetro Usuario" });
                return;
            }

            // Obtener carros por usuario de la tabla "carro"
            const car = await db["carro"].findAll({ where: { ID_usuario: userID } });

            if (!car) {
                // Si no se encuentra el carro con el usuario especificado, devolver un estado 404
                res.status(404).send({ message: "Carro no encontrado" });
                return;
            }

            // Registrar el carro obtenido en la consola para depuración
            console.log("Carro:", car);

            // Enviar el carro obtenido como respuesta
            res.send(car);
        } catch (error) {
            // Manejar errores
            if (error instanceof Error) {
                // Si el error es una instancia de la clase Error, enviar el mensaje de error
                res.status(500).send({ message: error.message });
            } else {
                // Si no es una instancia de Error (caso inesperado), enviar un mensaje de error genérico
                res.status(500).send({ message: "Error" });
            }
        }
    }

    // Método para actualizar un carro
    private async updateCar(req: Request, res: Response) {
        try {
            const carPlate = req.body.Placa;

            // Verificar si carPlate está indefinido o nulo
            if (!carPlate) {
                res.status(400).send({ message: "Falta el parámetro Placa" });
                return;
            }

            // Suponiendo que los datos actualizados del carro se envían en el cuerpo de la solicitud
            const updatedCarData = req.body;

            // Verificar si updatedCarData está vacío o indefinido
            if (!updatedCarData) {
                res.status(400).send({ message: "Faltan los datos actualizados del carro en el cuerpo de la solicitud" });
                return;
            }

            // Encontrar el carro por su placa en la tabla "carro"
            const car = await db["carro"].findOne({ where: { Placa: carPlate } });

            if (!car) {
                // Si no se encuentra el carro con la placa especificada, devolver un estado 404
                res.status(404).send({ message: "Carro no encontrado" });
                return;
            }

            // Actualizar el carro con los nuevos datos
            await car.update(updatedCarData);

            // Registrar el carro actualizado en la consola para depuración
            console.log("Carro actualizado:", car);

            // Enviar una respuesta exitosa
            res.send({ message: "Carro actualizado exitosamente" });
        } catch (error) {
            // Manejar errores
            if (error instanceof Error) {
                // Si el error es una instancia de la clase Error, enviar el mensaje de error
                res.status(500).send({ message: error.message });
            } else {
                // Si no es una instancia de Error (caso inesperado), enviar un mensaje de error genérico
                res.status(500).send({ message: "Error" });
            }
        }
    }

    // Método para eliminar un carro
    private async deleteCar(req: Request, res: Response) {
        try {
            // Suponiendo que se tiene un parámetro "carPlate" en la solicitud
            const carPlate = req.params.carPlate;

            // Verificar si carPlate está indefinido o nulo
            if (!carPlate) {
                res.status(400).send({ message: "Falta el parámetro Placa" });
                return;
            }

            // Encontrar el carro por su placa en la tabla "carro"
            const car = await db["carro"].findOne({ where: { Placa: carPlate } });

            if (!car) {
                // Si no se encuentra el carro con la placa especificada, devolver un estado 404
                res.status(404).send({ message: "Carro no encontrado" });
                return;
            }

            // Eliminar el carro de la base de datos
            await car.destroy();

            // Registrar el carro eliminado en la consola para depuración
            console.log("Carro eliminado:", car);

            // Enviar una respuesta exitosa
            res.send({ message: "Carro eliminado exitosamente" });
        } catch (error) {
            // Manejar errores
            if (error instanceof Error) {
                // Si el error es una instancia de la clase Error, enviar el mensaje de error
                res.status(500).send({ message: error.message });
            } else {
                // Si no es una instancia de Error (caso inesperado), enviar un mensaje de error genérico
                res.status(500).send({ message: "Error" });
            }
        }
    }
}

export default CarController;
