import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from '../models';

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
                //Todas las rutas que necesite su controlador
        }
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
}

export default UserController;