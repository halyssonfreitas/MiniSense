"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SensorDeviceSchema = new Schema({
    key: {
        type: String,
        require: true,
    },
    label: {
        type: String,
        require: true,
    },
    description: { type: String },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    DataStreams: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "DataStream",
        }],
});
exports.default = SensorDeviceSchema;
