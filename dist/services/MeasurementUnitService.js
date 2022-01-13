"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const MeasurementUnitRepository_1 = require("../repository/MeasurementUnitRepository");
class MeasurementUnitService {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            let measurementUnitList = yield MeasurementUnitRepository_1.default.find({});
            let mul = [];
            measurementUnitList.map(measurementUnit => {
                let x = {
                    id: measurementUnit._id,
                    symbol: measurementUnit.symbol,
                    description: measurementUnit.description
                };
                mul.push(x);
            });
            return mul;
        });
    }
    getById(_id) {
        return MeasurementUnitRepository_1.default.findById(_id);
    }
    create(measurementUnitDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            let measurementUnit = yield MeasurementUnitRepository_1.default.create(measurementUnitDTO);
            let mu = {
                id: measurementUnit.id,
                symbol: measurementUnit.symbol,
                description: measurementUnit.description
            };
            return mu;
        });
    }
    update(_id, measurementUnitDTO) {
        return MeasurementUnitRepository_1.default.findByIdAndUpdate(_id, measurementUnitDTO);
    }
    delete(_id) {
        return MeasurementUnitRepository_1.default.findByIdAndDelete(_id);
    }
}
exports.default = new MeasurementUnitService();
