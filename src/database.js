import mongoose from "mongoose";
import config from './config';

(async () => {
    const db = await mongoose.connect('mongodb+srv://mbfrey-user:<mbfrey123>@cluster0.ioebc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Database is connect to:', db.connection.name);
})();