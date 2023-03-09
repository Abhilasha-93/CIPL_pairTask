import express from 'express';
const router = express.Router();
import {createUser,getUser,getUserById,updateUser,deleteUser} from "../controller/userController";


router.post("/user", createUser)//create user
router.get("/userGet",getUser)//get users
router.get("/userGet/:id",getUserById) //get user by id
router.patch("/updateUser/:id",updateUser) //update User 
router.delete("/delUser/:id",deleteUser)// delete User


export default router