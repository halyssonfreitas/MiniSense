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
const SensorDeviceRepository_1 = require("../repository/SensorDeviceRepository");
const UserService_1 = require("./UserService");
class SensorDeviceService {
    get() {
        return SensorDeviceRepository_1.default.find({});
    }
    getById(_id) {
        return SensorDeviceRepository_1.default.findById(_id);
    }
    getByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let sensorDeviceListFull = yield SensorDeviceRepository_1.default.find({}).populate(['DataStreams']);
            let sensorDeviceListUser = [];
            sensorDeviceListFull.map(yield function (sensorDevice) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (sensorDevice.User.toString() === user) {
                        let dataStreamList = [];
                        sensorDevice.DataStreams.map(dataStream => {
                            let y = {
                                id: dataStream._id,
                                key: dataStream.key,
                                label: dataStream.label,
                                unitId: dataStream.MeasurementUnit,
                                deviceId: dataStream.SensorDevice,
                                measurementCount: dataStream.SensorDatas.length
                            };
                            dataStreamList.push(y);
                        });
                        let x = {
                            id: sensorDevice._id,
                            key: sensorDevice.key,
                            label: sensorDevice.label,
                            description: sensorDevice.description,
                            streams: dataStreamList
                        };
                        sensorDeviceListUser.push(x);
                    }
                });
            });
            return sensorDeviceListUser;
        });
    }
    create(sensorDeviceDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            sensorDeviceDTO.key = (0, uuidv4_1.uuid)();
            // pega o user que o SensorDevice se referência em seu cadastro
            let user = undefined;
            if ((user = yield UserService_1.default.getById(sensorDeviceDTO.User)) === null) {
                throw new Error("User doens't exist!");
            }
            const sensorDevice = yield SensorDeviceRepository_1.default.create(sensorDeviceDTO);
            //console.log("SensorDevice - create() : user :" + user)
            // inicia um novo array que vai compor o user.SensorDevices
            let usd = [sensorDevice._id.toString()];
            // pega os itens já existente em user.SensorDevices para o novo array
            user.SensorDevices.map(dev => {
                usd.push(dev.toString());
            });
            //console.log(usd)
            // seta o novo array dentro do user
            yield UserService_1.default.update(sensorDeviceDTO.User, { SensorDevices: usd });
            const sd = {
                "id": sensorDevice._id,
                "key": sensorDevice.key,
                "label": sensorDevice.label,
                "description": sensorDevice.description,
            };
            return sd;
        });
    }
    update(_id, dataStream) {
        return SensorDeviceRepository_1.default.findByIdAndUpdate(_id, dataStream);
    }
    delete(_id) {
        return SensorDeviceRepository_1.default.findByIdAndDelete(_id);
    }
}
exports.default = new SensorDeviceService();
