const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["admin", "customer", "restaurant"],
  },
});
const Role = mongoose.model("role", roleSchema);
module.exports = Role;
