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
        this.router.get('/currentCharge/:ID_usuario', this.getCurrentChargeByUserId.bind(this));
        this.router.get('/updateStatus/', this.updateStatusByHistoryId.bind(this));

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

    private async updateStatusByHistoryId(req: Request, res: Response) {
        try {
            const historyId = req.body.ID_historial; // Assuming 'historyId' is the parameter name in the route
            const newStatus = req.body.Estatus; // Assuming you send the new status in the request body
    
            // Check if 'historyId' and 'newStatus' are provided
            if (!historyId || !newStatus) {
                return res.status(400).send({ message: 'History ID and new status are required.' });
            }
    
            // Find the historical record by historyId
            const historicalRecord = await db["historial"].findByPk(historyId);
    
            // Check if the historical record exists
            if (!historicalRecord) {
                return res.status(404).send({ message: 'Historical record not found.' });
            }
    
            // Update the status
            historicalRecord.Estatus = newStatus;
    
            // Save the changes to the database
            await historicalRecord.save();
    
            // Send a success response
            res.send({ message: 'Status updated successfully.' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({ message: error.message });
            } else {
                res.status(500).send({ message: 'Error updating status.' });
            }
        }
    }
    

    private async getCurrentChargeByUserId(req: Request, res: Response) {
        try {
            const userId = req.params.ID_usuario;
            const { Op } = require("sequelize");

            let historial = await db["historial"].findOne({where: {[Op.and]: [{ ID_usuario: userId},{ Estatus: "Incompleto"}]}});
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