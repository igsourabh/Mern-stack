import mongoose from "mongoose";

const NotesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  descreption: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "Genreal",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("notes", NotesSchema);
