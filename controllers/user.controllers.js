import * as userServices from '../services/userServices.js';
import { validationResult } from 'express-validator';

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
};;