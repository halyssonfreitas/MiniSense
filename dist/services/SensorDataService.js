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
const SensorDataRepository_1 = require("../repository/SensorDataRepository");
const DataStreamService_1 = require("./DataStreamService");
class SensorDataService {
    get() {
        return SensorDataRepository_1.default.find({});
    }
    getById(_id) {
        return SensorDataRepository_1.default.findById(_id);
    }
    create(sensorDataDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            let ds = undefined;
            console.log(sensorDataDTO);
            if ((ds = yield DataStreamService_1.default.getById(sensorDataDTO.DataStream)) === null) {
                throw new Error("DataStream doens't exist!");
            }
            let sensorData = yield SensorDataRepository_1.default.create({
                timestamp: sensorDataDTO.timestamp,
                value: sensorDataDTO.value,
                MeasurementUnit: ds.MeasurementUnit,
                DataStream: ds._id.toString()
            });
            // dssd - Adivindo de DataStreamService a lista de SensorData
            let dssd = [sensorData._id.toString()];
            ds.SensorDatas.map((x) => __awaiter(this, void 0, void 0, function* () {
                dssd.push(x.toString());
            }));
            yield DataStreamService_1.default.update(sensorDataDTO.DataStream, { SensorDatas: dssd });
            console.log("SensorDataService - create()");
            const sd = {
                "id": sensorData._id,
                "timestamp": sensorData.timestamp,
                "value": sensorData.value,
                "unitId": sensorData.MeasurementUnit
            };
            return sd;
        });
    }
    update(_id, dataStream) {
        return SensorDataRepository_1.default.findByIdAndUpdate(_id, dataStream);
    }
    delete(_id) {
        return SensorDataRepository_1.default.findByIdAndDelete(_id);
    }
}
exports.default = new SensorDataService();
