import express from "express";
import {User} from "gym-management/models/user.model.js"


const router = express.Router();

//creating user
router.post("/create_user", async(req, res) => {
    try{
       const newUser = await User.create(req.body);

       res.status(201).json({
          success: true,
          message: "User created successfully !!",
          userInfo: {
             id: newUser._id,
             name: newUser.name,
             email: newUser.email,
             role: newUser.role
          }
       });
    }
    catch(error){
       res.status(404).json({
          success: false,
          message: "User creation failed :(",
          error: error.message
       });
    }
});

//get info of from the route 
router.get("/create_user", async(req,res) => {
    try{
        const user = await User.find().select("name email role");
        res.json(user);
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to fetch the data :(",
            error: error.message
        });
    }
});

export default router;