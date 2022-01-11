"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SensorDeviceRepository_1 = require("../repository/SensorDeviceRepository");
class SensorDeviceService {
    get() {
        return SensorDeviceRepository_1.default.find({});
    }
    getById(_id) {
        return SensorDeviceRepository_1.default.findById(_id);
    }
    create(dataStream) {
        return SensorDeviceRepository_1.default.create(dataStream);
    }
    update(_id, dataStream) {
        return SensorDeviceRepository_1.default.findByIdAndUpdate(_id, dataStream);
    }
    delete(_id) {
        return SensorDeviceRepository_1.default.findByIdAndDelete(_id);
    }
}
exports.default = new SensorDeviceService();
