
import { Router } from "express"; // Me permiten añadir nuevas rutas para mi servidor
import * as trackCtrl from '../controllers/track.controller';

const router = Router();

//// GET ////

// Obtengo todas las track
router.get('/', trackCtrl.findAllTracks);
//  Buscar track por id
router.get('/:id', trackCtrl.findOneTrack);

//// PUT ////

// Reproduce la canción
router.put('/:id/play', trackCtrl.playTrack);

//// DELETE ////

// Eliminar track
router.delete('/:id', trackCtrl.deleteTrack);

export default router; // --> Con el siguiente código puedo exportar router a otro archivo