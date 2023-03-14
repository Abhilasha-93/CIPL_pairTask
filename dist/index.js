"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const route_js_1 = __importDefault(require("./route/route.js"));
//import autoIncrement from 'mongoose-auto-increment';
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Port = 4000;
const hostname = '0.0.0.0';
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/', route_js_1.default);
mongoose_1.default.connect("mongodb+srv://Seema:C5PtEdt23kmtx9ov@cluster0.gjunl.mongodb.net/CIPLTask2?retryWrites=true&w=majority")
    .then(() => {
    console.log(' MongoDB Connected ');
}).catch(err => {
    console.log('Error connecting to MongoDB', err);
});
//autoIncrement.initialize(mongoose.connection);
app.listen(Port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${Port}/`);
});
