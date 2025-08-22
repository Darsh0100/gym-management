import { Plan } from "../models/plans.models.js";

export const addPlan = async(req,res) => {
     try{
       const{name, description, duration, price} = req.body;  

       const newPlan = await Plan.create({name, description, durationInDays, price});
       res.status(201).json({
          success: true,
          plan: newPlan
       });
     }catch(error){
       res.status(500).json({
         message: error.message
       });
     }
};