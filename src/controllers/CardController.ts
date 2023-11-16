import { Request, Response } from 'express';
import AbstractController from './AbstractController';
import db from '../models';

class CardController extends AbstractController {
    protected validateBody(type: any) {
        throw new Error('Method not implemented.');
    }
    // Singleton
    // Atributo clase
    private static instance: CardController;
    // Método de clase
    public static getInstance():AbstractController{
        if(this.instance){
        return this.instance;
        }
        this.instance = new CardController('card');
        return this.instance;
    }
    protected initRoutes(): void {
        this.router.get('/readCardsByUserId/:ID_usuario',this.getCardsByUserId.bind(this));
        this.router.post('/createCard/:ID_usuario',this.postCreateCard.bind(this));
    }

    // Método para obtener todas las tarjetas de un usuario
    private async getCardsByUserId(req: Request, res: Response) {
        try {
            const userId = req.params.ID_usuario;

            let tarjetas = await db["tarjeta"].findAll({where: { ID_usuario: userId}});
            console.log("Tarjetas:", tarjetas)
            res.send(tarjetas);
        } catch (error) {
            if (error instanceof Error){
                res.status(500).send({ message: error.message });
                }else{
                res.status(500).send({ message: "Error" });
                }
        }
    }
    // Método para registrar una nueva tarjeta
    private async postCreateCard(req: Request, res: Response) {
        try {
            const userId = req.params.ID_usuario;

            // Agregar el ID_usuario al cuerpo de la tarjeta antes de crearla
            const tarjetaData = {
                ...req.body,
                ID_usuario: userId,
            };

            await db["tarjeta"].create(tarjetaData);
            console.log("Registro exitoso");
            res.status(200).send("Registro exitoso");
        }catch(err:any){
                console.log("Error")
                res.status(500).send("Error fatal:" +err);
        }
    }
}

export default CardController;
