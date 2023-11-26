import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from '../models';
import fetch from "node-fetch";

class UserController extends AbstractController{
    protected validateBody(type: any) {
            throw new Error("Method not implemented.");
    }
    //Singleton
    //Atributo de clase
    private static instance:UserController;
    //Método de clase
    public static getInstance():AbstractController{
            if(this.instance){
            return this.instance;
            }
            this.instance = new UserController('user');
            return this.instance;
    }
    protected initRoutes(): void {
            this.router.get('/readUsers',this.getReadUsers.bind(this));
            this.router.post('/createUser',this.postCreateUser.bind(this));
            this.router.get('/readUser',this.getReadUser.bind(this));
            this.router.get('/loginUser',this.getReadUserByEmail.bind(this));
            this.router.get('/updateUser',this.updateUser.bind(this));
            this.router.get('/deleteUser',this.deleteUser.bind(this));
            this.router.get('/updateCashback',this.updateUserCashback.bind(this));
            //Todas las rutas que necesite su controlador
    }

    //Servicio para obtener todos los usuarios
    private async getReadUsers(req:Request,res:Response){
            try{
                    let usuarios= await db["usuario"].findAll()
                    console.log("Usuario:", usuarios);
                    res.send(usuarios);
            
            }catch(error){
                    if (error instanceof Error){
                    res.status(500).send({ message: error.message });
                    }else{
                    res.status(500).send({ message: "Error" });
                    }
            }
    
    }

    //Servicio para crear un registro de usuario nuevo
    private async postCreateUser(req:Request,res:Response){
            try{
                    console.log(req.body);
                    await db["usuario"].create(req.body);
                    console.log("Registro exitoso");
                    res.status(200).send("Registro exitoso");
            }catch(err:any){
                    console.log("Error")
                    res.status(500).send("Error fatal:" +err); 
            }
    }

    //Servicio para obtener el registro de un usuario
    private async getReadUser(req: Request, res: Response) {
        try {
            const userId = req.body.ID_usuario;

            //Revisa si se encuentra el parámetro dentro del cuerpo
            if (!userId) {
                res.status(400).send({ message: "Falta parámetro de correo" });
                return;
            }
    
            // Obtener un registro en el que el correo sea el mismo que en la petición
            const user = await db["usuario"].findOne({ where: { ID_usuario: userId } });
    
            if (!user) {
                // Si el usuario con ese correo no existe
                res.status(404).send({ message: "Usuario no encontrado" });
                return;
            }

            console.log("User:", user);
    
            // Envía la información obtenida como respuesta
            res.send(user);

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({ message: error.message });
            } else {
                res.status(500).send({ message: "Error" });
            }
        }
    }

    //Servicio para obtener el registro de un usuario
    private async getReadUserByEmail(req: Request, res: Response) {
        try {
            const userEmail = req.body.Correo;
            const userPass = req.body.Contrasena;
            const { Op } = require("sequelize");

            //Revisa si se encuentra el parámetro dentro del cuerpo
            if (!userEmail) {
                res.status(400).send({ message: "Falta parámetro de correo" });
                return;
            }
    
            // Obtener un registro en el que el correo sea el mismo que en la petición
            const user = await db["usuario"].findOne({where: {[Op.and]: [{ Correo: userEmail},{ Contrasena: userPass}]}});
    
            if (!user) {
                // Si el usuario con ese correo no existe
                res.status(404).send({ message: "Usuario no encontrado" });
                return;
            }

            console.log("User:", user);
    
            // Envía la información obtenida como respuesta
            res.send(user);

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({ message: error.message });
            } else {
                res.status(500).send({ message: "Error" });
            }
        }
    }

    //Servicio para actualizar la información de un usuario
    private async updateUser(req: Request, res: Response) {
        try {

            const userID = req.body.ID_usuario;

            //Revisa si se encuentra el parámetro dentro del cuerpo
            if (!userID) {
                res.status(400).send({ message: "Falta parámetro de correo" });
                return;
            }
    
            const updatedUserData = req.body;
    
            if (!updatedUserData) {
                res.status(400).send({ message: "No se encuentra la información nueva del usuario" });
                return;
            }
    
            // Encuentra el registro de correo para el usuario
            const user = await db["usuario"].findOne({ where: { ID_usuario: userID } });
    
            if (!user) {
                    // If the user with the specified email is not found, return a 404 status
                    res.status(404).send({ message: "No se encuentra el usuario" });
                    return;
            }
    
            // Update the user with the new data
            await user.update(updatedUserData);
    
            // Log the updated user to the console for debugging
            console.log("Updated User:", user);
    
            // Send a success response
            res.send({ message: "User updated successfully" });
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

    //Servicio para borrar un usuario
    private async deleteUser(req: Request, res: Response) {
        try {
            // Assuming you have an email parameter in the request
            const userID = req.body.ID_usuario;

            // Check if userID is undefined or null
            if (!userID) {
                    res.status(400).send({ message: "Email parameter is missing" });
                    return;
            }

            // Find the user by email from the "usuario" table
            const user = await db["usuario"].findOne({ where: { ID_usuario: userID } });

            if (!user) {
                    // If the user with the specified email is not found, return a 404 status
                    res.status(404).send({ message: "User not found" });
                    return;
            }

            // Delete the user from the database
            await user.destroy();

            // Log the deleted user to the console for debugging
            console.log("Deleted User:", user);

            // Send a success response
            res.send({ message: "User deleted successfully" });
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

    private async updateUserCashback(req: Request, res: Response) {
        try {
            const userID = req.body.ID_usuario;
    
            if (!userID) {
                res.status(400).send({ message: "Missing user parameter (ID_usuario)" });
                return;
            }
    
            const newCashback = req.body.Cashback;
    
            if (!newCashback) {
                res.status(400).send({ message: "New user information (Cashback) not found" });
                return;
            }
    
            const user = await db["usuario"].findOne({ where: { ID_usuario: userID } });
    
            if (!user) {
                res.status(404).send({ message: "User not found" });
                return;
            }
    
            user.Cashback = newCashback;
            await user.save(); // Assuming the user model has a save() method
    
            console.log("Updated User:", user.toJSON()); // Log the entire updated user object
    
            res.send({ message: "User updated successfully" });
        } catch (error) {
            console.error('Error updating user cashback:', error);
    
            if (error instanceof Error) {
                res.status(500).send({ message: error.message });
            } else {
                res.status(500).send({ message: "Error updating user cashback" });
            }
        }
    }
    

    


}

export default UserController;  