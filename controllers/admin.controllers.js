import { User } from "../models/user.models";

export const getAllUsers = async(req,res) => {
     try {
        const users = User.find().select("-password");
        res.json(users);
     } catch (error) {
        res.status(500).json({
            message: error.message
        })
     }
};