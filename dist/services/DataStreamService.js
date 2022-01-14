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
const uuidv4_1 = require("uuidv4");
const DataStreamRepository_1 = require("../repository/DataStreamRepository");
const MeasurementUnitService_1 = require("./MeasurementUnitService");
const SensorDeviceService_1 = require("./SensorDeviceService");
class DataStreamService {
    get() {
        return DataStreamRepository_1.default.find({});
    }
    getById(_id) {
        return DataStreamRepository_1.default.findById(_id);
    }
    getByIdRoute(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let dataStream = yield DataStreamRepository_1.default.findById(_id).populate(['SensorDatas']);
            let sensorDataList = [];
            for (let i = 0; i < dataStream.SensorDatas.length; i++) {
                let sensorData = dataStream.SensorDatas[i];
                let x = {
                    timestamp: sensorData.timestamp,
                    value: sensorData.value
                };
                sensorDataList.push(x);
            }
            let ds = {
                id: dataStream._id,
                key: dataStream.key,
                label: dataStream.label,
                unitId: dataStream.MeasurementUnit,
                deviceId: dataStream.SensorDevice,
                measurementCount: dataStream.SensorDatas.length,
                measurements: sensorDataList
            };
            return ds;
        });
    }
    create(dataStreamDTO, sensorDevice) {
        return __awaiter(this, void 0, void 0, function* () {
            dataStreamDTO.SensorDevice = sensorDevice;
            let sd = undefined;
            if ((sd = yield SensorDeviceService_1.default.getByIdSimple(dataStreamDTO.SensorDevice)) === null) {
                throw new Error("SensorDevice doens't exist!");
            }
            let mu = undefined;
            if ((mu = yield MeasurementUnitService_1.default.getById(dataStreamDTO.unitId)) === null) {
                throw new Error("MeasurementUnit doens't exist!");
            }
            let dataStream = yield DataStreamRepository_1.default.create({
                key: (0, uuidv4_1.uuid)(),
                label: dataStreamDTO.label,
                enabled: false,
                SensorDevice: dataStreamDTO.SensorDevice,
                MeasurementUnit: dataStreamDTO.unitId,
                SensorDatas: [],
            });
            // sdds - Adivindo de SensorDeviceService a lista de DataStream
            let sdds = [dataStream._id.toString()];
            for (let i = 0; i < sd.DataStreams.length; i++) {
                sdds.push(sd.DataStreams[i].toString());
            }
            yield SensorDeviceService_1.default.update(dataStreamDTO.SensorDevice, { DataStreams: sdds });
            const ds = {
                "id": dataStream._id,
                "key": dataStream.key,
                "label": dataStream.label,
                "unitId": dataStream.MeasurementUnit,
                "deviceId": dataStream.SensorDevice,
                "measurementCount": dataStream.SensorDatas.length
            };
            return ds;
        });
    }
    update(_id, dataStream) {
        return DataStreamRepository_1.default.findByIdAndUpdate(_id, dataStream);
    }
    delete(_id) {
        return DataStreamRepository_1.default.findByIdAndDelete(_id);
    }
}
exports.default = new DataStreamService();
