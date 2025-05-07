// config.js
require('dotenv').config();

const apiKey = process.env.API_KEY;

if (!apiKey) {
    console.error('Error: La clave de API no está definida. Asegúrate de que el archivo .env contiene API_KEY.');
    process.exit(1);
}

module.exports = { apiKey };

// Ejemplo de uso en otro archivo
const { apiKey } = require('./config');

console.log(`Clave de API importada: ${apiKey}`);
