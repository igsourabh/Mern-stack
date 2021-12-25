import mongoose from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: "Genreal",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("user", UserSchema);
