"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const MeasurementUnitSchema_1 = require("../models/MeasurementUnitSchema");
exports.default = mongoose.model("MeasurementUnit", MeasurementUnitSchema_1.default);
