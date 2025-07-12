import dotenv from 'dotenv';
dotenv.config();

console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI); // 👈 Add this

import http from 'http';
import app from './app.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});