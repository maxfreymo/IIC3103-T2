
import { Router } from "express"; // Me permiten añadir nuevas rutas para mi servidor
import * as artistCtrl from '../controllers/artist.controller';
import * as albumCtrl from '../controllers/album.controller';

const router = Router();

//// GET ////

// Obtiene todos los artistas
router.get('/', artistCtrl.findAllArtists);
//  Obtener artista por ID
router.get('/:id', artistCtrl.findOneArtist);
//  Obtiene todos los albums del artista
router.get('/:id/albums', artistCtrl.findArtistAlbums);
// Obtiene todas las canciones del artista
router.get('/:id/tracks', artistCtrl.findArtistTracks);

//// POST ////

// Crear un artista
router.post('/', artistCtrl.createArtist);
// Crear un album
router.post('/:id/albums', albumCtrl.createAlbum);

//// PUT ////

// Reproduce todas las canciones de un artista
router.put('/:id/albums/play', artistCtrl.playAlbums);

//// DELETE ////

// Eliminar artista
router.delete('/:id', artistCtrl.deleteArtist);

export default router; // --> Con el siguiente código puedo exportar router a otro archivo