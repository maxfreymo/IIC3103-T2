
// Carga las variables de entorno desde .env
import { config } from 'dotenv';
config({path: '.env'});

console.log(process.env.MONGODB_URI);

export default {
    mongodbURL: process.env.MONGODB_URI,
};