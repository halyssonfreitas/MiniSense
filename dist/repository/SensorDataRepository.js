"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const SensorDataSchema_1 = require("../models/SensorDataSchema");
exports.default = mongoose.model("SensorData", SensorDataSchema_1.default);
