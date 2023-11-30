import { Request, Response } from "express"; // Importa los tipos Request y Response desde el módulo express
import AbstractController from "./AbstractController"; // Importa la clase AbstractController
import db from "../models"; // Importa el objeto db desde el módulo models

/**
 * Controlador para la gestión de historiales.
 */
class HistoryController extends AbstractController {
    /**
   * Método para validar el cuerpo de la petición (necesario por la herencia de AbstractController).
   * @param type - Tipo de datos para la validación del cuerpo (no implementado en este controlador).
   * @returns Objeto de validación (no implementado en este controlador).
   */
    protected validateBody(type: any) {
        throw new Error('Method not implemented.');
    }

    private static instance: HistoryController;

    /**
   * Método estático para obtener una instancia única del controlador de historiales (singleton).
   * @returns Instancia del controlador de historiales.
   */
    public static getInstance():AbstractController{
        if(this.instance){
            return this.instance;
        }
        this.instance = new HistoryController('history');
        return this.instance;
    }
    /**
   * Método para inicializar las rutas del controlador de historiales.
   * Define las rutas para obtener y crear historiales.
   */
    protected initRoutes(): void {
        this.router.get('/readHistoryByUserId/:ID_usuario', this.getHistoryByUserId.bind(this));
        this.router.post('/createHistory/:ID_usuario',this.postCreateHistory.bind(this));
    }

    /**
   * Método para obtener todo el historial de un usuario.
   * @param req - Objeto Request de Express.
   * @param res - Objeto Response de Express.
   */
    private async getHistoryByUserId(req: Request, res: Response) {
        try {
            const userId = req.params.ID_usuario;

            // Busca todo el historial asociado al usuario
            let historial = await db["historial"].findAll({where: { ID_usuario: userId}});
            console.log("Historial:", historial)
            res.send(historial);
        } catch (error) {
            if (error instanceof Error){
                res.status(500).send({ message: error.message });
                }else{
                res.status(500).send({ message: "Error" });
                }
        }
    }

    /**
   * Método para crear un nuevo registro en el historial.
   * @param req - Objeto Request de Express.
   * @param res - Objeto Response de Express.
   */
    private async postCreateHistory(req: Request, res: Response) {
        try {
            const userId = req.params.ID_usuario;// Obtiene el ID del usuario desde los parámetros de la URL

            // Agregar el ID_usuario al cuerpo del historial antes de crearlo
            const historyData = {
                ...req.body,
                ID_usuario: userId,
            };

            // Crea el nuevo registro en el historial en la base de datos
            await db["historial"].create(historyData);
            console.log("Registro exitoso");
            res.status(200).send("Registro exitoso");
        } catch(err:any) {
            console.log("Error")
            res.status(500).send("Error fatal:" +err);
        }
    }
}

export default HistoryController;