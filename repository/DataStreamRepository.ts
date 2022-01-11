import * as mongoose from "mongoose"

import DataStreamSchema from "../models/DataStreamSchema"

export default mongoose.model("DataStream", DataStreamSchema)