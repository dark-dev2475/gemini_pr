// services folder is made to third party communication like conononeection with databse . whatever the communication is not related to server that is used in services module


import userModel from '../models/user.model.js';

export const createUser = async ({ email, password }) => {
    if (!email || !password) throw new Error("email and password are required");
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userModel.create({ email, password: hashedPassword });
    return user;
};
