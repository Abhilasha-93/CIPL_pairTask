import express , {Application, Request, Response } from "express";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import route from './route/route.js';
//import autoIncrement from 'mongoose-auto-increment';
const app:Application = express();

const Port:number = 4000;
const hostname = '0.0.0.0';

app.use(bodyParser.json());
app.use('/', route)
app.use(cors({origin: '*'}));



mongoose.connect("mongodb+srv://Seema:C5PtEdt23kmtx9ov@cluster0.gjunl.mongodb.net/CIPLTask2?retryWrites=true&w=majority")
.then(() => {
  console.log(' MongoDB Connected ');
}).catch(err => {
  console.log('Error connecting to MongoDB', err);
});

//autoIncrement.initialize(mongoose.connection);

app.listen(Port,hostname,()=>{
    console.log(`Server is running at http://${hostname}:${Port}/`);
})