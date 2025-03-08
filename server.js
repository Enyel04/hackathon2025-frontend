const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path'); // Para trabajar con rutas de archivos

const app = express();
const port = 3000;

// Configura CORS (si es necesario)
app.use(cors());

// Para poder parsear los datos del cuerpo de las solicitudes POST (JSON)
app.use(express.json()); // Para el manejo de JSON

// Sirve los archivos estáticos (como index.html) desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Configura el proxy para la API externa con GET
app.get('/proxy/pet/create', async (req, res) => {
    try {
        const response = await axios.get('https://hackaton.corpoeureka.net/pet/create');
        res.json(response.data);
    } catch (error) {
        console.error("Error al hacer la solicitud GET:", error);
        res.status(500).json({ message: 'Error al obtener los datos' });
    }
});

// Configura el proxy para la API externa con POST
app.post('/proxy/pet/feed', async (req, res) => {
    try {
        // Enviar los datos del cuerpo (req.body) a la API externa
        const response = await axios.post('https://hackaton.corpoeureka.net/pet/feed', req.body);
        res.json(response.data);
    } catch (error) {
        console.error("Error al hacer la solicitud POST:", error);
        res.status(500).json({ message: 'Error al enviar los datos' });
    }
});

// Si alguien accede al servidor, redirígelo a index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});