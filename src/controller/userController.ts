import  userModel from '../model/userModel';
import {Request,Response} from 'express';
//import {findAndUpdate,deleteUser} from '../services/users.services';


function toUpperCase(str: string): string {
    return str.toUpperCase();
  }

const createUser = async function (req:Request, res:Response) {
    try {
       const { name, age,gender,state,pincode,country } = req.body;

       const randomNumber:number = Math.floor(Math.random() * 900) + 100; 
       
       const stateCode:string = state.slice(0, 2).toUpperCase(); 
       
       const countryCode:string = country.slice(0, 2).toUpperCase(); 
       
       const roll:string = `${countryCode}${stateCode}${randomNumber}`;
       
        // Create the new user with the next roll number
        const user = await userModel.create({ name, age,gender,state,pincode,country, rollNo:roll });
        // console.log(user)
        return res.status(201).json({data: user,error: false,msg: "Data Submitted successfully"});
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
   
}

const getUser = async function (req:Request, res:Response) {
    try {
     
        let user = await userModel.find({isDeleted: false})
        res.json({
            message:"User Details",data:user});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }

}

const getUserById = async function(req:Request,res:Response){
    try {
      
        const id = req.params.id;
        const user = await userModel.findOne({ rollNo:id, isDeleted: false });
        if (user) {
          return res.status(200).json(user);
        } else {
          return res.status(404).json({ message: "User not found" });
        }
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }
}

const updateUser = async function(req:Request,res:Response){
    try{
       
        const id = req.params.id;
        const requestBody=req.body;
        const rollNo = req.body.rollNo;

        const existUser=await userModel.findOne({rollNo:id,isDeleted:false})
        if(!existUser){
        return res.status(404).json({error:true,msg: "No user found with given Id"});
        } 

        if(rollNo){
            return res.status(400).json({error:true,msg:"Can not update rollNo"})
        }else{
        
            const updateUser=await userModel.findOneAndUpdate({rollNo:id},{$set:requestBody},{new:true});
    
             return res.status(200).json({data: updateUser,error: false,msg: "Data Updated successfully"});
        }
        
    }catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }
}

const deleteUser=async function(req:Request,res:Response){
    try{ 
      
            const id = req.params.id;
    
            const existUser=await userModel.findOne({rollNo:id,isDeleted:false})
            if(!existUser){
            return res.status(404).json({error:true,msg: "No user found with given Id"});
            } 
    
            const delUser=await userModel.findOneAndUpdate({rollNo:id,isDeleted:false},{isDeleted: true, deletedAt:new Date()},{new:true});
        
            return res.status(200).json({data: delUser,error: false,msg: "Data Deleted successfully"});
        }catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
        }
}
export {createUser,getUser,getUserById,updateUser,deleteUser}

