"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SensorDataRepository_1 = require("../repository/SensorDataRepository");
class SensorDataService {
    get() {
        return SensorDataRepository_1.default.find({});
    }
    getById(_id) {
        return SensorDataRepository_1.default.findById(_id);
    }
    create(dataStream) {
        console.log("SensorDataService - create()");
        return SensorDataRepository_1.default.create(dataStream);
    }
    update(_id, dataStream) {
        return SensorDataRepository_1.default.findByIdAndUpdate(_id, dataStream);
    }
    delete(_id) {
        return SensorDataRepository_1.default.findByIdAndDelete(_id);
    }
}
exports.default = new SensorDataService();
