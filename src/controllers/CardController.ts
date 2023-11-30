import { Request, Response } from 'express'; // Importa los tipos Request y Response desde el módulo express
import AbstractController from './AbstractController'; // Importa la clase AbstractController
import db from '../models';// Importa el objeto db desde el módulo models

/**
 * Controlador para la gestión de tarjetas.
 */
class CardController extends AbstractController {
    /**
   * Método para validar el cuerpo de la petición (necesario por la herencia de AbstractController).
   * @param type - Tipo de datos para la validación del cuerpo (no implementado en este controlador).
   * @returns Objeto de validación (no implementado en este controlador).
   */
    protected validateBody(type: any) {
        throw new Error('Method not implemented.');
    }
    private static instance: CardController;
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

    /**
    * Método para obtener todas las tarjetas de un usuario.
    * @param req - Objeto Request de Express.
    * @param res - Objeto Response de Express.
    */
    private async getCardsByUserId(req: Request, res: Response) {
        try {
            const userId = req.params.ID_usuario; // Obtiene el ID del usuario desde los parámetros de la URL

            // Busca todas las tarjetas asociadas al usuario
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

    /**
    * Método para registrar una nueva tarjeta.
    * @param req - Objeto Request de Express.
    * @param res - Objeto Response de Express.
    */
   private async postCreateCard(req: Request, res: Response) {
        try {
            const userId = req.params.ID_usuario; // Obtiene el ID del usuario desde los parámetros de la URL

            // Agregar el ID_usuario al cuerpo de la tarjeta antes de crearla
            const tarjetaData = {
                ...req.body,
                ID_usuario: userId,
            };

            // Crea la nueva tarjeta en la base de datos
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
