const express = require('express');
const path = require('path');

const app = express();
// Servir los archivos estáticos de la aplicación Angular 
app.use (express.static('./dist/cars-for-cracks/browser'));
// Redirigir todas las peticiones al index.html
app.get('/*', (req, res) => {
    res.sendFile('index.html', {root: 'dist/cars-for-cracks/browser/'});
});
// Iniciar el servidor
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});