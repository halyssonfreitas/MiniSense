"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    SensorDevices: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SensorDevice'
        }],
});
exports.default = UserSchema;
