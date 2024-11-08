const mongoose = require("mongoose");
const Dish = require("./dish.model");
const OrderStatus = require("./orderStatus.model");
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
          min: 1,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order_status",
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

OrderSchema.pre("save", async function (next) {
  try {
    let total = 0;

    for (const item of this.dishes) {
      const dish = await Dish.findById(item.dish_id);
      if (!dish) {
        throw new Error(`Dish with ID ${item.dish_id} not found`);
      }
      total += dish.price * item.quantity;
    }
    this.total = total;

    if (!this.status) {
      const pendingStatus = await OrderStatus.findOne({ name: "Pending" });
      if (!pendingStatus) {
        throw new Error(
          `Status "Pending" not found in order_status collection`
        );
      }
      this.status = pendingStatus._id;
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
