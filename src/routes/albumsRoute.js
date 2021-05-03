
import { Router } from "express"; // Me permiten añadir nuevas rutas para mi servidor
import * as albumCtrl from '../controllers/album.controller';
import * as trackCtrl from '../controllers/track.controller';

const router = Router();

//// GET ////

// Obtiene todos los albums
router.get('/', albumCtrl.findAllAlbums);
// Obtener album por id
router.get('/:id', albumCtrl.findOneAlbum);
// Obtiene todas las canciones del album
router.get('/:id/tracks', albumCtrl.findAlbumTracks);

//// POST ////

// Crea un track
router.post('/:id/tracks', trackCtrl.createTrack);

//// PUT ////

// Reproduce todas las canciones de un album
router.put('/:id/tracks/play', albumCtrl.playTracks);

//// DELETE ////

// Eliminar album
router.delete('/:id', albumCtrl.deleteAlbum);

export default router; // --> Con el siguiente código puedo exportar router a otro archivo