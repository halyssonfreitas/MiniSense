import * as express from 'express'
import * as bodyParser from 'body-parser'


import DB from './infra/DB';
import DataStreamController from './controllers/DataStreamController';
import MeasurementUnitController from './controllers/MeasurementUnitController';
import SensorDataController from './controllers/SensorDataController';
import SensorDeviceController from './controllers/SensorDeviceController';
import UserController from './controllers/UserController';
class StartUp {
    // para acessar do program.ts
    public app: express.Application;
    private _db : DB;
    private bodyParser; // Não entendi isso daqui - como que se cria uma propriedade para um pacote?

    //digita ctor e enter
    constructor() {
        this.app = express()
        this.connection()
        this.middler()
        this.routes()
        
    }

    middler (){
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended : false }))
    }

    //criando rotas
    routes(){
        this.app.route('/').get((req, res) => {
            res.send({versao : '0.0.1'})
        })
        /*
        this.app.route('/api/v1/news').get(NewsController.get)
        this.app.route('/api/v1/news/:id').get(NewsController.getById)
        this.app.route('/api/v1/news').post(NewsController.create)
        this.app.route('/api/v1/news/:id').put(NewsController.update)
        this.app.route('/api/v1/news/:id').delete(NewsController.delete)
        */

        this.app.route('/api/v1/DataStream').get(DataStreamController.get)
        this.app.route('/api/v1/DataStream/:id').get(DataStreamController.getById)
        this.app.route('/api/v1/DataStream').post(DataStreamController.create)
        this.app.route('/api/v1/DataStream/:id').put(DataStreamController.update)
        this.app.route('/api/v1/DataStream/:id').delete(DataStreamController.delete)

        this.app.route('/api/v1/MeasurementUnit').get(MeasurementUnitController.get)
        this.app.route('/api/v1/MeasurementUnit/:id').get(MeasurementUnitController.getById)
        this.app.route('/api/v1/MeasurementUnit').post(MeasurementUnitController.create)
        this.app.route('/api/v1/MeasurementUnit/:id').put(MeasurementUnitController.update)
        this.app.route('/api/v1/MeasurementUnit/:id').delete(MeasurementUnitController.delete)

        this.app.route('/api/v1/SensorData').get(SensorDataController.get)
        this.app.route('/api/v1/SensorData/:id').get(SensorDataController.getById)
        this.app.route('/api/v1/SensorData').post(SensorDataController.create)
        this.app.route('/api/v1/SensorData/:id').put(SensorDataController.update)
        this.app.route('/api/v1/SensorData/:id').delete(SensorDataController.delete)

        this.app.route('/api/v1/SensorDevice').get(SensorDeviceController.get)
        this.app.route('/api/v1/SensorDevice/:id').get(SensorDeviceController.getById)
        this.app.route('/api/v1/SensorDevice').post(SensorDeviceController.create)
        this.app.route('/api/v1/SensorDevice/:id').put(SensorDeviceController.update)
        this.app.route('/api/v1/SensorDevice/:id').delete(SensorDeviceController.delete)

        this.app.route('/api/v1/User').get(UserController.get)
        this.app.route('/api/v1/User/:id').get(UserController.getById)
        this.app.route('/api/v1/User').post(UserController.create)
        this.app.route('/api/v1/User/:id').put(UserController.update)
        this.app.route('/api/v1/User/:id').delete(UserController.delete)

    }

    connection(){
        this._db = new DB();
        // Ideia - no futuro eu posso alterar para passar parametros da URL
        this._db.createConnection();
    }
}


export default new StartUp();