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
    getByIds(listOfIds) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("listOfIds : " + listOfIds);
            let dataStreamList = [];
            listOfIds.map(dataStream => {
                var ds = this.getById(dataStream);
                dataStreamList.push(ds);
            });
            console.log(dataStreamList);
            return dataStreamList;
        });
    }
    create(dataStreamDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            let sd = undefined;
            if ((sd = yield SensorDeviceService_1.default.getById(dataStreamDTO.SensorDevice)) === null) {
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
            sd.DataStreams.map((x) => __awaiter(this, void 0, void 0, function* () {
                sdds.push(x.toString());
            }));
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
