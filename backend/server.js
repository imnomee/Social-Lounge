import express from 'express';
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 7860;

connectDB();

app.use(express.json());

app.listen(PORT, () =>
    console.log(`Server is running on: http://localhost:${PORT}`)
);
