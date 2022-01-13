"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helper {
    constructor() {
        this.sendResponse = function (res, statusCode, data) {
            res.status(statusCode).json(data);
        };
    }
}
exports.default = new Helper();
