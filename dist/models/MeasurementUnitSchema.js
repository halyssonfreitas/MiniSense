"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MeasurementUnitSchema = new Schema({
    symbol: { type: String },
    description: { type: String },
});
exports.default = MeasurementUnitSchema;
