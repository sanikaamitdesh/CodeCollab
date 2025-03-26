const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Code || mongoose.model("Code", codeSchema);
