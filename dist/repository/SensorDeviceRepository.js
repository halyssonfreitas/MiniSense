"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const SensorDeviceSchema_1 = require("../models/SensorDeviceSchema");
exports.default = mongoose.model("SensorDevice", SensorDeviceSchema_1.default);
