import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";

class HistoryController extends AbstractController {
    protected validateBody(type: any) {
        throw new Error('Method not implemented.');
    }

    private static instance: HistoryController;

    public static getInstance():AbstractController{
        if(this.instance){
            return this.instance;
        }
        this.instance = new HistoryController('history');
        return this.instance;
    }
    protected initRoutes(): void {
        this.router.get('/readHistoryByUserId/:ID_usuario', this.getHistoryByUserId.bind(this));
        this.router.post('/createHistory/:ID_usuario',this.postCreateHistory.bind(this));
    }

    private async getHistoryByUserId(req: Request, res: Response) {
        try {
            const userId = req.params.ID_usuario;

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

    private async postCreateHistory(req: Request, res: Response) {
        try {
            const userId = req.params.ID_usuario;

            const historyData = {
                ...req.body,
                ID_usuario: userId,
            };

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