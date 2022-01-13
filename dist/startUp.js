"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const DB_1 = require("./infra/DB");
const DataStreamController_1 = require("./controllers/DataStreamController");
const MeasurementUnitController_1 = require("./controllers/MeasurementUnitController");
const SensorDataController_1 = require("./controllers/SensorDataController");
const SensorDeviceController_1 = require("./controllers/SensorDeviceController");
const UserController_1 = require("./controllers/UserController");
// import swaggerUi from 'swagger-ui-express'; // Não funciona
// import swaggerDocument from './swagger.json' // Não funciona
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
class StartUp {
    //digita ctor e enter
    constructor() {
        this.app = express();
        this.connection();
        this.middler();
        /* // Para testar
        this.app.use((req, res, next) => {
            //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
            res.header("Access-Control-Allow-Origin", "*");
            //Quais são os métodos que a conexão pode realizar na API
            res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            this.app.use(cors());
            next();
        })
        */
        this.routes();
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
    middler() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    //criando rotas
    routes() {
        this.app.route('/').get((req, res) => {
            res.send({ versao: '0.0.1' });
        });
        this.app.route('/api/v1/DataStream').get(DataStreamController_1.default.get);
        this.app.route('/api/v1/DataStream/:id').get(DataStreamController_1.default.getById);
        this.app.route('/api/v1/DataStream').post(DataStreamController_1.default.create);
        this.app.route('/api/v1/DataStream/:id').put(DataStreamController_1.default.update);
        this.app.route('/api/v1/DataStream/:id').delete(DataStreamController_1.default.delete);
        this.app.route('/api/v1/MeasurementUnit').get(MeasurementUnitController_1.default.get);
        this.app.route('/api/v1/MeasurementUnit/:id').get(MeasurementUnitController_1.default.getById);
        this.app.route('/api/v1/MeasurementUnit').post(MeasurementUnitController_1.default.create);
        this.app.route('/api/v1/MeasurementUnit/:id').put(MeasurementUnitController_1.default.update);
        this.app.route('/api/v1/MeasurementUnit/:id').delete(MeasurementUnitController_1.default.delete);
        this.app.route('/api/v1/SensorData').get(SensorDataController_1.default.get);
        this.app.route('/api/v1/SensorData/:id').get(SensorDataController_1.default.getById);
        this.app.route('/api/v1/SensorData').post(SensorDataController_1.default.create);
        this.app.route('/api/v1/SensorData/:id').put(SensorDataController_1.default.update);
        this.app.route('/api/v1/SensorData/:id').delete(SensorDataController_1.default.delete);
        this.app.route('/api/v1/SensorDevice').get(SensorDeviceController_1.default.get);
        this.app.route('/api/v1/SensorDevice/:id').get(SensorDeviceController_1.default.getById);
        this.app.route('/api/v1/SensorDevice').post(SensorDeviceController_1.default.create);
        this.app.route('/api/v1/SensorDevice/:id').put(SensorDeviceController_1.default.update);
        this.app.route('/api/v1/SensorDevice/:id').delete(SensorDeviceController_1.default.delete);
        this.app.route('/api/v1/User').get(UserController_1.default.get);
        this.app.route('/api/v1/User/:id').get(UserController_1.default.getById);
        this.app.route('/api/v1/User').post(UserController_1.default.create);
        this.app.route('/api/v1/User/:id').put(UserController_1.default.update);
        this.app.route('/api/v1/User/:id').delete(UserController_1.default.delete);
    }
    connection() {
        this._db = new DB_1.default();
        // Ideia - no futuro eu posso alterar para passar parametros da URL
        this._db.createConnection();
    }
}
exports.default = new StartUp();
