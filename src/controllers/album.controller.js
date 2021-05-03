import Artist from '../models/Artist';
import Album from '../models/Album';
import Track from '../models/Track';

//// GET ////

export const findAllAlbums = async (req, res) => {
    try
    {
        const albums = await Album.find();
        if (albums.length < 1)
        {
            throw "Unknown";
        } 
        else
        {
            res.json(albums);
        }
    } catch (error) {
        if (error == "Unknown")
        {
            res.sendStatus(404);
        }
        else
        {
            res.sendStatus(400);
        }};
};

export const findOneAlbum = async (req, res) => {
    try
    {
        const album = await Album.find({id: req.params.id});
        if (album.length < 1)
        {
            throw "Unknown";
        } 
        else
        {
            res.json(album[0]);
        }
    } catch (error) {
        if (error == "Unknown")
        {
            res.sendStatus(404);
        }
        else
        {
            res.sendStatus(400);
        }};
};

export const findAlbumTracks = async (req, res) => {
    try
    {
        const tracks = await Track.find({album_id: req.params.id});
        if (tracks.length < 1)
        {
            throw "Unknown";
        } 
        else
        {
            res.json(tracks);
        }
    } catch (error) {
        if (error == "Unknown")
        {
            res.sendStatus(404);
        }
        else
        {
            res.sendStatus(400);
        }};
};

//// POST ////

export const createAlbum = async (req, res) => {
    try
    {
        // Valido si vienen los campos necesarios para crear album
        if (typeof req.body.name != 'string' || typeof req.body.genre != 'string')
        {
            throw "TypeError";
        }
        // Valido si es que el artista del album existe
        const artist = await Artist.find({id: req.params.id});
        if (artist.length < 1)
        {
            throw "Unknown";
        }
        let id_encode = Buffer.from(req.body.name, 'binary').toString('base64');
        if ( id_encode.length > 22)
        {
            id_encode = id_encode.slice(0,22);
        }
        // Busco el album por su id en la base de datos
        const album = await Album.find({id: id_encode});
        // En caso de que el album ya exista
        if ( album.length > 0)
        {
            res.status(409);
            res.send(album[0]);
        }
        else
        {
            const protocol = req.protocol;
            const address = req.get('host');
            const newAlbum = new Album({ 
                id: id_encode,
                artist_id: req.params.id,
                name: req.body.name,
                genre: req.body.genre,
                artist: `${protocol}://${address}/artists/${req.params.id}`,
                tracks: `${protocol}://${address}/albums/${id_encode}/tracks`,
                self: `${protocol}://${address}/${id_encode}`
            });
            await newAlbum.save();
            res.status(201);
            res.send(newAlbum);
        }
    } catch (error) {
        if (error == "Unknown")
        {
            res.sendStatus(422);
        }
        else
        {
            res.sendStatus(400);
        }};
};

//// PUT ////

export const playTracks = async (req, res) => {
    try
    {
        const protocol = req.protocol;
        const address = req.get('host');
        const album = await Album.find({id: req.params.id});
        if (album.length < 1)
        {
            throw "Unknown";
        }
        else
        {
            const tracks = await Track.find({album: `${protocol}://${address}/albums/${req.params.id}`});
            for (let step = 0; tracks[step] != null ; step++) {
                await Track.updateOne(
                    {id: tracks[step].id},
                    {$set: {times_played: tracks[step].times_played + 1}}
                )
            }
            res.sendStatus(200);
        }
    } catch (error) {
        if (error == "Unknown")
        {
            res.sendStatus(404);
        }
        else
        {
            res.sendStatus(400);
        }};
};

//// DELETE ////

export const deleteAlbum = async (req, res) => {
    try
    {
        const album = await Album.find({id: req.params.id});
        if (album < 1)
        {
            throw "Unknown";
        }
        else
        {
            // Elimino todos los track del album
            await Track.deleteMany({album_id: req.params.id});
            // Elimino el album
            await Album.deleteOne({id: req.params.id});
            res.sendStatus(204);
        }
    } catch (error) {
        if (error == "Unknown")
        {
            res.sendStatus(404);
        }
        else
        {
            res.sendStatus(400);
        }};
};