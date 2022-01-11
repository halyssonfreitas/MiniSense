import * as mongoose from "mongoose"

import UserSchema from "../models/UserSchema"

export default mongoose.model("User", UserSchema)