
import express from "express"; // framework 
// app.js -> Guarda la configuración del servidor

import ArtistsRoutes from './routes/artistsRoute';
import AlbumsRoutes from './routes/albumsRoute';
import TrackRoutes from './routes/tracksRoute';

const app = express();

//settings
app.set('port', process.env.PORT || 3000); // Si el servidor tiene un puerto definido usar ese, eoc el puerto 3000
app.set('json spaces', 2);

app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.json({"message": "Welcome to my application"})
});

app.use('/artists', ArtistsRoutes);
app.use('/albums', AlbumsRoutes);
app.use('/tracks', TrackRoutes);

// Si el usuario ingresa una dirección no válida, se envía error 404 not found
app.use((req, res) => {
    res.sendStatus(404);
});


// Manejo otros tipos de errores como si fueran bad requests
app.use((error, req, res, next) => {
    res.sendStatus(error.status || 404);
});

export default app;