"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MeasurementUnitRepository_1 = require("../repository/MeasurementUnitRepository");
class MeasurementUnitService {
    get() {
        return MeasurementUnitRepository_1.default.find({});
    }
    getById(_id) {
        return MeasurementUnitRepository_1.default.findById(_id);
    }
    create(dataStream) {
        return MeasurementUnitRepository_1.default.create(dataStream);
    }
    update(_id, dataStream) {
        return MeasurementUnitRepository_1.default.findByIdAndUpdate(_id, dataStream);
    }
    delete(_id) {
        return MeasurementUnitRepository_1.default.findByIdAndDelete(_id);
    }
}
exports.default = new MeasurementUnitService();
