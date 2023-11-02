import express, {Request, Response} from 'express';

class Server {
    private app:express.Application;

    constructor() {
        this.app = express();
    }

    public async init() {
        await this.app.listen(3000);
        console.log('Corriendo en el puerto 3000 🦝🦝')
    }

}

export default Server;