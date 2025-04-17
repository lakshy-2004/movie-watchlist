import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connection from './connection/connection.js';
import auth from './routes/auth.js';
import movie from './routes/movie.js';

const PORT =  1000;
const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname, "./frontend/dist")));


connection();

app.get('/', (req,res) => {
    res.send("Hello! ");
});

app.use('/api/v1', auth);
app.use('/api/v2', movie);

app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "./frontend/dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});