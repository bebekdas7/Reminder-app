import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  medName: { type: String, required: true },
  reminderMsg: { type: String, required: true },
  remindAt: { type: String, required: true },
  remindNumber: { type: Number, required: true },
});

const reminderModel = new mongoose.model("reminder", reminderSchema);

export default reminderModel;
