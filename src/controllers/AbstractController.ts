import { Router } from 'express'; // Importa el tipo Router desde el módulo express

// Middlewares
import ValidationErrorMiddleware from '../middlewares/validationError'; // Importa el middleware de manejo de errores de validación

/**
 * Clase abstracta para definir controladores.
 */
export default abstract class AbstractController {
  private _router: Router = Router(); // Instancia un objeto Router
  private _prefix: string; // Almacena el prefijo de la ruta para el controlador

<<<<<<< HEAD
  // Propiedad de solo lectura para acceder al prefijo
  public get prefix(): string {
    return this._prefix;
  }

  // Propiedad de solo lectura para acceder al objeto Router
  public get router(): Router {
    return this._router;
  }

  /**
   * Constructor de la clase AbstractController.
   * @param prefix - Prefijo de la ruta para el controlador.
   */
  protected constructor(prefix: string) {
    this._prefix = prefix; // Asigna el prefijo de la ruta
    this.initRoutes(); // Inicializa las rutas del controlador
  }

  /**
   * Método abstracto para inicializar las rutas del controlador.
   */
  protected abstract initRoutes(): void;
=======
export default abstract class AbstractController{
    private _router:Router = Router();
    private _prefix:string;

    protected handleErrors = ValidationErrorMiddleware.handleErrors;

    public get prefix():string{
            return this._prefix;
    }

    public get router():Router{
            return this._router
    }

    protected constructor(prefix:string){
            this._prefix=prefix;
            this.initRoutes();

    }

    //Inicializar rutas
    protected abstract initRoutes():void;
    //Validar el body de la petición
    protected abstract validateBody(type:any):any;
>>>>>>> 15cebb806c10ede7ad3fc5013bfa8a2a1f19fd70

  /**
   * Método abstracto para validar el cuerpo de la petición.
   * @param type - Tipo de datos para la validación del cuerpo.
   * @returns Objeto de validación.
   */
  protected abstract validateBody(type: any): any;
}