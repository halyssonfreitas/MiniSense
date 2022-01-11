"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataStreamRepository_1 = require("../repository/DataStreamRepository");
class DataStreamService {
    get() {
        return DataStreamRepository_1.default.find({});
    }
    getById(_id) {
        return DataStreamRepository_1.default.findById(_id);
    }
    create(dataStream) {
        return DataStreamRepository_1.default.create(dataStream);
    }
    update(_id, dataStream) {
        return DataStreamRepository_1.default.findByIdAndUpdate(_id, dataStream);
    }
    delete(_id) {
        return DataStreamRepository_1.default.findByIdAndDelete(_id);
    }
}
exports.default = new DataStreamService();
