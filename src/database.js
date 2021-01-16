import config from './config';
import mongoose from 'mongoose';

const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:  true
}

mongoose.connect(config.DB,option)
        .then( db => console.log("Server is connected"))
        .catch(err => console.error(err));