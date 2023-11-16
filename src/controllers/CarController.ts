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
                //Todas las rutas que necesite su controlador
        }
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

        private async getReadCar(req: Request, res: Response) {
                try {
                        // Assuming you have a correo parameter in the request
                        const carPlaca = req.body.Placa;
                
                        // Check if carPlaca is undefined or null
                        if (!carPlaca) {
                        res.status(400).send({ message: "Placa parameter is missing" });
                        return;
                        }
                
                        // Fetch a single car by Placa from the "carro" table
                        const car = await db["carro"].findOne({ where: { Placa: carPlaca } });
                
                        if (!car) {
                        // If the car with the specified Placa is not found, return a 404 status
                        res.status(404).send({ message: "Car not found" });
                        return;
                        }
                
                        // Log the retrieved car to the console for debugging
                        console.log("Car:", car);
                
                        // Send the retrieved car as a response
                        res.send(car);
                } catch (error) {
                        // Handle errors
                        if (error instanceof Error) {
                        // If the error is an instance of the Error class, send the error message
                        res.status(500).send({ message: error.message });
                        } else {
                        // If it's not an instance of Error (unexpected case), send a generic error message
                        res.status(500).send({ message: "Error" });
                        }
                }
        }

        private async updateCar(req: Request, res: Response) {
                try {
                const carPlate = req.body.Placa;
        
                // Check if carPlate is undefined or null
                if (!carPlate) {
                        res.status(400).send({ message: "Plate parameter is missing" });
                        return;
                }
        
                // Assuming the updated car data is sent in the request body
                const updatedCarData = req.body;
        
                // Check if updatedCarData is empty or undefined
                if (!updatedCarData) {
                        res.status(400).send({ message: "Updated car data is missing in the request body" });
                        return;
                }
        
                // Find the car by email from the "carro" table
                const car = await db["carro"].findOne({ where: { Placa: carPlate } });
        
                if (!car) {
                        // If the car with the specified email is not found, return a 404 status
                        res.status(404).send({ message: "Car not found" });
                        return;
                }
        
                // Update the car with the new data
                await car.update(updatedCarData);
        
                // Log the updated car to the console for debugging
                console.log("Updated Car:", car);
        
                // Send a success response
                res.send({ message: "Car updated successfully" });
                } catch (error) {
                // Handle errors
                if (error instanceof Error) {
                        // If the error is an instance of the Error class, send the error message
                        res.status(500).send({ message: error.message });
                } else {
                        // If it's not an instance of Error (unexpected case), send a generic error message
                        res.status(500).send({ message: "Error" });
                }
                }
        }

        private async deleteCar(req: Request, res: Response) {
                try {
                // Assuming you have an email parameter in the request
                const carPlate = req.params.carPlate;
        
                // Check if carPlate is undefined or null
                if (!carPlate) {
                        res.status(400).send({ message: "Plate parameter is missing" });
                        return;
                }
        
                // Find the car by email from the "carro" table
                const car = await db["carro"].findOne({ where: { Placa: carPlate } });
        
                if (!car) {
                        // If the car with the specified email is not found, return a 404 status
                        res.status(404).send({ message: "Car not found" });
                        return;
                }
        
                // Delete the car from the database
                await car.destroy();
        
                // Log the deleted car to the console for debugging
                console.log("Deleted Car:", car);
        
                // Send a success response
                res.send({ message: "Car deleted successfully" });
                } catch (error) {
                // Handle errors
                if (error instanceof Error) {
                        // If the error is an instance of the Error class, send the error message
                        res.status(500).send({ message: error.message });
                } else {
                        // If it's not an instance of Error (unexpected case), send a generic error message
                        res.status(500).send({ message: "Error" });
                }
                }
        }
        


}

export default CarController;  