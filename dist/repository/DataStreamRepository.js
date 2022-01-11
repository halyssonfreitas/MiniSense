"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const DataStreamSchema_1 = require("../models/DataStreamSchema");
exports.default = mongoose.model("DataStream", DataStreamSchema_1.default);
