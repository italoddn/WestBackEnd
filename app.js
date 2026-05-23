import express, { json, urlencoded } from 'express';
import cors from 'cors'

import router from './src/routes/routes.js';
import env from 'dotenv';

const app = express();

env.config();

app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}));
app.use(router);

export default app;