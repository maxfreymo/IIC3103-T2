import Artist from '../models/Artist';
import Album from '../models/Album';
import Track from '../models/Track';

//// GET ////

export const findAllArtists = async (req, res) => {
    try
    {
        const artists = await Artist.find();
        if (artists.length < 1)
        {
            throw "Unknown";
        } 
        else
        {
            res.json(artists);
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

export const findOneArtist = async (req, res) => {
    try
    {
        const artist = await Artist.find({id: req.params.id});
        if (artist.length < 1)
        {
            throw "Unknown";
        } 
        else
        {
            res.json(artist[0]);
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

export const findArtistAlbums = async (req, res) => {
    try
    {
        const albums = await Album.find({artist_id: req.params.id});
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

export const findArtistTracks = async (req, res) => {
    try
    {
        const protocol = req.protocol;
        const address = req.get('host');
        const tracks = await Track.find({artist: `${protocol}://${address}/artists/${req.params.id}`});
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

export const createArtist = async (req, res) => {
    try
    {
        // Valido si vienen los campos necesarios para crear artista
        if (typeof req.body.name != 'string' || typeof req.body.age != 'number')
        {
            throw TypeError;
        }
        let id_encode = Buffer.from(req.body.name).toString('base64');
        if ( id_encode.length > 22)
        {
            id_encode = id_encode.slice(0,22);
        }
        // Busco al artista por su id en la base de datos
        const artist = await Artist.find({id: id_encode});
        // En caso de que el artista ya exista
        if ( artist.length > 0)
        {
            res.status(409);
            res.send(artist[0]);
        }
        else
        {
            const protocol = req.protocol;
            const address = req.get('host');
            const newArtist = new Artist({ 
                id: id_encode,
                name: req.body.name,
                age: req.body.age,
                albums: `${protocol}://${address}/artists/${id_encode}/albums`,
                tracks: `${protocol}://${address}/artists/${id_encode}/tracks`,
                self: `${protocol}://${address}/artists/${id_encode}`
            });
            await newArtist.save();
            res.status(201);
            res.send(newArtist);
        }
    } catch (error) {
        res.sendStatus(400);}
};

//// PUT ////

export const playAlbums = async (req, res) => {
    try
    {
        const protocol = req.protocol;
        const address = req.get('host');
        const tracks = await Track.find({artist: `${protocol}://${address}/artists/${req.params.id}`});
        if (tracks.length < 1)
        {
            throw "Unknown";
        }
        else
        {
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

export const deleteArtist = async (req, res) => {
    try
    {
        const protocol = req.protocol;
        const address = req.get('host');
        const artist = await Artist.find({id: req.params.id});
        if (artist.length < 1)
        {
            throw "Unknown";
        } 
        else
        {
            // Elimino todos los track del artista
            await Track.deleteMany({artist: `${protocol}://${address}/artists/${req.params.id}`});
            // Elimino todos los albums del artista
            await Album.deleteMany({artist_id: req.params.id});
            // Elimino al artista
            await Artist.deleteOne({id: req.params.id});
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