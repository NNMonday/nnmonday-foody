const mongoose = require("mongoose");
const OrderStatusSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["Pending", "Processing", "Delivering", "Delivered"],
    required: true,
  },
});
const OrderStatus = mongoose.model("order_status", OrderStatusSchema);
module.exports = OrderStatus;
