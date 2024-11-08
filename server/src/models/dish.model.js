const mongoose = require("mongoose");
const DishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category_dish",
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurant",
    required: true,
  },
});
const Dish = mongoose.model("dish", DishSchema);
module.exports = Dish;
