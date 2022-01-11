import * as mongoose from "mongoose"

import MeasurementUnitSchema from "../models/MeasurementUnitSchema"

export default mongoose.model("MeasurementUnit", MeasurementUnitSchema)