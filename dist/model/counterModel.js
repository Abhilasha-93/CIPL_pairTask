"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const counterSchema = new mongoose_1.Schema({
    id: {
        type: String
    },
    seq: {
        type: Number
    },
});
const counterModel = (0, mongoose_1.model)('Counter', counterSchema);
exports.default = counterModel;
