
// Carga las variables de entorno desde .env
import { config } from 'dotenv';
config({path: '../variables.env'});

export default {
    mongodbURL: process.env.MONGODB_URI,
};