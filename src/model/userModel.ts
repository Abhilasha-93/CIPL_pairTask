import mongoose,{Schema,model,Document, DateUnit} from 'mongoose';
//import autoIncrement from 'mongoose-auto-increment';
// var connection = mongoose.createConnection("mongodb+srv://Seema:C5PtEdt23kmtx9ov@cluster0.gjunl.mongodb.net/CIPLTask2?retryWrites=true&w=majority");
// autoIncrement.initialize(connection);

export interface UserDocument extends Document{
    name:string,
    rollNo:string,
    age:number,
    gender:string,
    state:string,
    pincode:number,
    country:string,
    isDeleted:boolean,
    deletedAt:Date
}

interface User{
    name:string,
    rollNo:string,
    age:number,
    gender:string,
    state:string,
    pincode:number,
    country:string,
    isDeleted:boolean,
    deletedAt:Date
}

const userSchema = new Schema<UserDocument>({
    name: {
        type: String,
        required: true
    },
    rollNo: { 
        type: String, 
        unique: true 
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country:{
        type:String,
        required:true
    },
    pincode: {
        type: Number,
        required: true
    },
    isDeleted: {
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date
    }
  });

// AutoIncrement.initialize(mongoose.connection);
// userSchema.plugin(AutoIncrement.plugin, { model: 'User', field: 'rollNo', startAt: 1 });  


const UserModel=model<UserDocument>('User',userSchema);
export default UserModel;

// userSchema.plugin(autoIncrement.plugin, {
//     model: 'userSchema',
//     field: 'id',
//     startAt: 1,
//     incrementBy: 1
//   });

