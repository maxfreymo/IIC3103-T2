import {Schema, model} from 'mongoose';

const artistSchema = new Schema({
    id: String,
    name: String,
    age: Number,
    albums: String,
    tracks: String,
    self: String,
}, {
    versionKey: false,
    timestamps: false
});

export default model('Artist', artistSchema);
