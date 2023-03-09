"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
//import {findAndUpdate,deleteUser} from '../services/users.services';
function toUpperCase(str) {
    return str.toUpperCase();
}
const createUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, age, gender, state, pincode, country } = req.body;
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
            const randomNumber = Math.floor(Math.random() * 900) + 100;
            const stateCode = state.slice(0, 2).toUpperCase();
            const countryCode = country.slice(0, 2).toUpperCase();
            const roll = `${countryCode}${stateCode}${randomNumber}`;
            // Create the new user with the next roll number
            const user = yield userModel_1.default.create({ name, age, gender, state, pincode, country, rollNo: roll });
            // console.log(user)
            return res.status(201).json({ data: user, error: false, msg: "Data Submitted successfully" });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
};
exports.createUser = createUser;
const getUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield userModel_1.default.find({ isDeleted: false });
            res.json({
                message: "User Details", data: user
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
};
exports.getUser = getUser;
const getUserById = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const user = yield userModel_1.default.findOne({ rollNo: id, isDeleted: false });
            if (user) {
                return res.status(200).json(user);
            }
            else {
                return res.status(404).json({ message: "User not found" });
            }
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
};
exports.getUserById = getUserById;
const updateUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const requestBody = req.body;
            const rollNo = req.body.rollNo;
            const existUser = yield userModel_1.default.findOne({ rollNo: id, isDeleted: false });
            if (!existUser) {
                return res.status(404).json({ error: true, msg: "No user found with given Id" });
            }
            if (rollNo) {
                return res.status(400).json({ error: true, msg: "Can not update rollNo" });
            }
            else {
                const updateUser = yield userModel_1.default.findOneAndUpdate({ rollNo: id }, { $set: requestBody }, { new: true });
                return res.status(200).json({ data: updateUser, error: false, msg: "Data Updated successfully" });
            }
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
};
exports.updateUser = updateUser;
const deleteUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const existUser = yield userModel_1.default.findOne({ rollNo: id, isDeleted: false });
            if (!existUser) {
                return res.status(404).json({ error: true, msg: "No user found with given Id" });
            }
            const delUser = yield userModel_1.default.findOneAndUpdate({ rollNo: id, isDeleted: false }, { isDeleted: true, deletedAt: new Date() }, { new: true });
            return res.status(200).json({ data: delUser, error: false, msg: "Data Deleted successfully" });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
};
exports.deleteUser = deleteUser;
