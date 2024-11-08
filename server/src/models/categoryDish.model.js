const mongoose = require("mongoose");
const CategoryDishSchema = new mongoose.Schema({
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
});
const CategoryDish = mongoose.model("category_dish", CategoryDishSchema);
module.exports = CategoryDish;
