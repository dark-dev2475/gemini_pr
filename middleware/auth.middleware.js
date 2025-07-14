import jwt from 'jsonwebtoken';
import redisClient from '../services/redis.services.js';

export const authUser = async (req, res, next) => {
    try{
        console.log(req.cookies);
        console.log(req.headers.authorization);
    const token =req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        console.log(res.status(401).json({ message: "No token provided" }));
        return res.status(401).json({ message: "Unauthorized" });

    } 
     
    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted) {
        console.log(res.status(401).json({ message: "Token is blacklisted" }));
        return res.status(401).json({ message: "Unauthorized" });
    }
 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
}
catch(error){
    console.log(error);
    res.status(401).send({ message: "Invalid token" });
}
}