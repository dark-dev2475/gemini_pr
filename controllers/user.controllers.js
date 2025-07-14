import * as userServices from '../services/userServices.js';
import { validationResult } from 'express-validator';
import userModel from '../models/user.model.js';
import redisClient from '../services/redis.services.js';

export const createUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await userServices.createUser(req.body);
        const token = user.generateJWT(); // <-- Call on the user instance
        return res.status(201).json({ user, token });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const loginUserController = async (req, res) => {
    const erros=validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({ errors: erros.array() });
    }
    try{
        const { email, password } = req.body;
       const user =await userModel.findOne({ email }).select('+password');

       if(!user || !user.isValidPassword(password)) {
            return res.status(401).json({message: 'Invalid email or password' });
        }
        const isMatch= await user.isValidPassword(password);
        if(!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = user.generateJWT(); // <-- Call on the user instance
        return res.status(200).json({ user, token });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getUserController = async (req, res) => {
    console.log(req.user);
    res.status(200).json({ user: req.user });
}

export const logoutUserController = async (req, res) => {
   try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
console.log("Headers:", req.headers);
console.log("Cookies:", req.cookies);

     if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }
    redisClient.set(token, 'logged_out', 'EX', 60*60*24); // Store token in Redis with an expiration time

    res.status(200).json({ message: 'User logged out successfully' });
   }

   catch (error) {
        return res.status(500).json({ message: error.message });
    }

}