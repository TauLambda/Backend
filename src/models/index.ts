// Importa los módulos fs y path para manejar archivos y rutas de manera conveniente
import fs from 'fs';
import path from 'path';
import config from '../config/config';

// Importa la biblioteca Sequelize y otras configuraciones desde archivos externos
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Crea un objeto vacío para almacenar los modelos de la base de datos
const db: any = {};
let sequelize: any;

// Verifica el entorno de ejecución y configura Sequelize con la información correspondiente
if (env === 'development') {
    sequelize = new Sequelize(
        config.development.database,
        config.development.username,
        config.development.password, {
            dialect: config.development.dialect,
            host: config.development.host,
            define: {
                timestamps: false,
                freezeTableName: true
            }
        });
    console.log("Hola");
}

// Lee todos los archivos en el directorio actual y carga los modelos en el objeto db
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach(file => {
        // Importa y ejecuta cada modelo, pasando la instancia de Sequelize y DataTypes
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

// Asocia los modelos si tienen un método `associate` definido
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Agrega las instancias de Sequelize al objeto db para su acceso en otras partes de la aplicación
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exporta el objeto db configurado con los modelos y la instancia de Sequelize
export default db;
