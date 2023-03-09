"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
    pincode: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }
});
// AutoIncrement.initialize(mongoose.connection);
// userSchema.plugin(AutoIncrement.plugin, { model: 'User', field: 'rollNo', startAt: 1 });  
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
// userSchema.plugin(autoIncrement.plugin, {
//     model: 'userSchema',
//     field: 'id',
//     startAt: 1,
//     incrementBy: 1
//   });
