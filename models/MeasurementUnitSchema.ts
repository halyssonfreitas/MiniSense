import * as mongoose from "mongoose"

const Schema = mongoose.Schema

const MeasurementUnitSchema = new Schema({
    symbol : {type : String},
    description : {type : String},
});

export default MeasurementUnitSchema;