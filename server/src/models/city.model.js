const mongoose = require("mongoose");
const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
});
const City = mongoose.model("city", citySchema);
module.exports = City;
