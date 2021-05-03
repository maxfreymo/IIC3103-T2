import {Schema, model} from 'mongoose';

const albumSchema = new Schema({
    id: String,
    artist_id: String,
    name: String,
    genre: String,
    artist: String,
    tracks: String,
    self: String,
}, {
    versionKey: false,
    timestamps: false
});

export default model('Album', albumSchema);