"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = require("../repository/UserRepository");
class UserService {
    get() {
        return UserRepository_1.default.find({});
    }
    getById(_id) {
        return UserRepository_1.default.findById(_id);
    }
    create(dataStream) {
        console.log("UserService - create() : " + dataStream);
        return UserRepository_1.default.create(dataStream);
    }
    update(_id, dataStream) {
        return UserRepository_1.default.findByIdAndUpdate(_id, dataStream);
    }
    delete(_id) {
        return UserRepository_1.default.findByIdAndDelete(_id);
    }
}
exports.default = new UserService();
