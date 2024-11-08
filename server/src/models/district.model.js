const mongoose = require("mongoose");
const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  city_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "city",
    required: true,
  },
});
const District = mongoose.model("district", districtSchema);
module.exports = District;
