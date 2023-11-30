import { NextFunction, Request, Response } from 'express'; // Importa los tipos NextFunction, Request y Response desde el módulo express
import { validationResult } from 'express-validator'; // Importa la función validationResult desde el módulo express-validator

/**
 * Middleware para manejar errores de validación.
 */
class ValidationErrorMiddleware {
        /**
         * Maneja los errores de validación.
         * @param req - Objeto de solicitud (Request).
         * @param res - Objeto de respuesta (Response).
         * @param next - Función para pasar al siguiente middleware.
         */
public static handleErrors(req: Request, res: Response, next: NextFunction) {
                const result = validationResult(req); // Obtiene el resultado de la validación a partir de la solicitud
                if (!result.isEmpty()) {
                        return res.status(422).json({ errors: result.array() }); // Retorna una respuesta con el código de estado 422 (Unprocessable Entity) y los errores de validación en formato JSON
                }
                return next(); // Llama a la función next para pasar al siguiente middleware en la cadena de manejo de solicitudes
        }
}

// Exporta la clase ValidationErrorMiddleware para su uso en otros archivos
export default ValidationErrorMiddleware;