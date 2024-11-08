const mongoose = require("mongoose");
const wardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  district_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "district",
    required: true,
  },
});
const Ward = mongoose.model("ward", wardSchema);
module.exports = Ward;
