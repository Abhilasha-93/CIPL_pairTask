"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controller/userController");
router.post("/user", userController_1.createUser); //create user
router.get("/userGet", userController_1.getUser); //get users
router.get("/userGet/:id", userController_1.getUserById); //get user by id
router.patch("/updateUser/:id", userController_1.updateUser); //update User 
router.delete("/delUser/:id", userController_1.deleteUser); // delete User
exports.default = router;
