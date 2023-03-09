import  userModel from '../model/userModel';
import {Request,Response} from 'express';
//import {findAndUpdate,deleteUser} from '../services/users.services';


function toUpperCase(str: string): string {
    return str.toUpperCase();
  }

const createUser = async function (req:Request, res:Response) {
    try {
        res.setHeader('Access-Control-Allow-Origin','*')

        const { name, age,gender,state,pincode,country } = req.body;

        // Find the highest roll number
        // const highestRollNo = await userModel.findOne().sort('-rollNo').exec();
        // console.log("highestRollNo",highestRollNo)
        // const nextRollNo = highestRollNo ? highestRollNo.rollNo + 1 : 1;

    //     const myState:string=toUpperCase(state);
    //     const myCountry:string=toUpperCase(country);


    //     console.log(myState);
    //     console.log(myCountry);

        
    //    const stateCode = myState.split("", 2);
    //    const countryCode = myCountry.split("", 2);
       
    //    console.log("stateCode------>",stateCode);
    //    console.log("countryCode===============>",countryCode);

    //    const concatStateCountry = countryCode.concat(stateCode);
    //    console.log("concatStateCountry--------------------------->",+concatStateCountry);

    //    const randomNumber = Math.floor(Math.random() * 900) + 100;
    //    console.log("randomNumber--------------------->",+randomNumber);
    
    //    const randomRoll = randomNumber.toString().split("");
    //    //const roll = randomRoll.split("")
    //    console.log("randomRoll", +randomRoll)
       

    // //    const myRollNo:string = concatStateCountry + randomNumber
    //    const myRollNo = concatStateCountry.concat(randomRoll);
    //    console.log("myRollNo", +myRollNo);


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
        res.setHeader('Access-Control-Allow-Origin','*')
        let user = await userModel.find({isDeleted: false})
        res.json({
            message:"User Details",data:user });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }

}

const getUserById = async function(req:Request,res:Response){
    try {
        res.setHeader('Access-Control-Allow-Origin','*')
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
        res.setHeader('Access-Control-Allow-Origin','*')
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
        res.setHeader('Access-Control-Allow-Origin','*')
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

