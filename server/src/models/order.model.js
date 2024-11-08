const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
      required: true,
    },
    dishes: [
      {
        dish_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "dish",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order_status",
      required: true,
    },
    address: {
      city_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "city",
      },
      district_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "district",
      },
      ward_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ward",
      },
      detail: {
        type: String,
        maxlength: 200,
      },
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
