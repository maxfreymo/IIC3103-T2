import Track from '../models/Track';
import Album from '../models/Album';

//// GET ////

export const findAllTracks = async (req, res) => {
    try
    {
        const tracks = await Track.find();
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

export const findOneTrack = async (req, res) => {
    try
    {
        const track = await Track.find({id: req.params.id});
        if (track.length < 1)
        {
            throw "Unknown";
        } 
        else
        {
            res.json(track);
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

export const createTrack = async (req, res) => {
    try
    {
        // Valido si vienen los campos necesarios para crear track
        if (typeof req.body.name != 'string' || typeof req.body.duration != 'number')
        {
            throw TypeError;
        }
        // Valido si es que el album existe
        const valid_album = await Album.find({id: req.params.id});
        if (valid_album.length < 1)
        {
            throw "Unknown";
        }
        let id_encode = Buffer.from(req.body.name, 'binary').toString('base64');
        if ( id_encode.length > 22)
        {
            id_encode = id_encode.slice(22);
        }
        // Busco el track por su id en la base de datos
        const track = await Track.find({id: id_encode});
        // En caso de que el artista ya exista
        if (track.length > 0)
        {
            res.status(409);
            res.send(track);
        }
        else
        {
            const album = await Album.findOne({id: req.params.id});
            const protocol = req.protocol;
            const address = req.get('host');
            const newTrack = new Track({ 
                id: id_encode,
                album_id: req.params.id,
                name: req.body.name,
                duration: req.body.duration,
                times_played: 0,
                artist: `${protocol}://${address}/artists/${album.artist_id}`,
                album: `${protocol}://${address}/albums/${req.params.id}`,
                self: `${protocol}://${address}/tracks/${id_encode}`
            });
            await newTrack.save();
            res.sendStatus(201);
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

export const playTrack = async (req, res) => {
    try
    {
        const track = await Track.findOne({id: req.params.id});
        if (track == null)
        {
            throw "Unknown";
        }
        else
        {
            await Track.updateOne(
                {id: req.params.id},
                {$set: {times_played: track.times_played + 1}}
                );
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

export const deleteTrack = async (req, res) => {
    try
    {
        const track = await Track.find({id: req.params.id});
        if (track.length < 1)
        {
            throw "Unknown";
        } 
        else
        {
            await Track.deleteOne({id: req.params.id});
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