import dotenv from 'dotenv';
dotenv.config();

import Redis from 'ioredis';

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
});

console.log('port', process.env.REDIS_PORT);

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});
redisClient.on('error', (err) => {
    console.error('❌ Redis connection error:', err);
});

export default redisClient;