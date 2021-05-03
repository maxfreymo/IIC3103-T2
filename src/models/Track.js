import {Schema, model} from 'mongoose';

const trackSchema = new Schema({
    id: String,
    album_id: String,
    name: String,
    duration: Number,
    times_played: Number,
    artist: String,
    album: String,
    self: String,
}, {
    versionKey: false,
    timestamps: false
});

export default model('Track', trackSchema);