"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const UserSchema_1 = require("../models/UserSchema");
exports.default = mongoose.model("User", UserSchema_1.default);
