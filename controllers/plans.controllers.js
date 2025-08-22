import { Plan } from "../models/plans.models.js";

// lets admin add the plans to the database
export const addPlan = async(req,res) => {
     try{
       const{name, description, durationInDays, price} = req.body;  

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

// this gets all the plans available in the database for the user whether loggedin or not
export const getPlans = async(req,res) => {
    try{
       const plans = await Plan.find().lean();// this fetches all the plan available in the database
       // .lean() represents the mongoDB object data as json format 
       res.status(200).json({
         success: true,
         plans
       });  
    }
    catch(error){
       res.status(500).json({
          error: error.message
       });
    }
};