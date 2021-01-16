// importacion de librerias y widdleware
import express from 'express';
import morgan from 'morgan';

import {createRole} from './lib/initialSetup'; 

import authRouter from './routes/auth.routes';

const app = express();
createRole();

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes
app.use('/api/auth', authRouter);


export default app;