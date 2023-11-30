import express, { Request, Response } from 'express'; // Importa express y los tipos Request y Response desde el módulo express
import AbstractController from '../controllers/AbstractController'; // Importa la clase AbstractController desde el archivo AbstractController en el directorio controllers
import db from '../models'; // Importa el objeto db desde el archivo models en el directorio models

class Server {
  private app: express.Application;
  private port: number;
  private env: string;

  /**
   * Constructor de la clase Server.
   * @param appInit - Configuración inicial del servidor, incluyendo puerto, entorno, middlewares y controladores.
   */
  constructor(appInit: { port: number; env: string; middlewares: any[]; controllers: AbstractController[] }) {
    this.app = express();
    this.port = appInit.port;
    this.env = appInit.env;
    this.loadMiddlewares(appInit.middlewares);
    this.loadControllers(appInit.controllers);
  }

  /**
   * Carga los controladores en la aplicación Express.
   * @param controllers - Lista de controladores que se cargarán en la aplicación.
   */
  private loadControllers(controllers: AbstractController[]): void {
    controllers.forEach((controller: AbstractController) => {
      this.app.use(`/${controller.prefix}`, controller.router);
    });
  }

  /**
   * Carga los middlewares en la aplicación Express.
   * @param middlewares - Lista de middlewares que se cargarán en la aplicación.
   */
  private loadMiddlewares(middlewares: any[]): void {
    middlewares.forEach((middleware: any) => {
      this.app.use(middleware);
    });
  }

  /**
   * Conecta con la base de datos mediante Sequelize.
   */
  private async connectDB(): Promise<void> {
    await db.sequelize.sync({ force: false });
  }

  /**
   * Inicializa el servidor Express, conecta a la base de datos y escucha en el puerto especificado.
   */
  public async init(): Promise<void> {
    await this.connectDB();
    this.app.listen(this.port, () => {
      console.log(`Server::Running 🚀 😱 @ 'http://localhost:${this.port}'`);
    });
  }
}

export default Server; // Exporta la clase Server para su uso en otros archivos
