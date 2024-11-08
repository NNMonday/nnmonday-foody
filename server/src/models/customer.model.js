const mongoose = require("mongoose");
const City = require("./city.model");
const District = require("./district.model");
const Ward = require("./ward.model");

const CustomerSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    cart: [
      {
        _id: false,
        dish_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "dish",
          required: true,
          unique: [true, "Dish already exists in cart"],
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    addresses: [
      {
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
    ],
  },
  { timestamps: true }
);

async function validateAddress(value) {
  for (const address of value) {
    const populatedAddress = await mongoose
      .model("customer")
      .populate(address, [
        { path: "city_id", model: City },
        { path: "district_id", model: District },
        { path: "ward_id", model: Ward },
      ]);

    const { city_id, district_id, ward_id } = populatedAddress;

    if (String(district_id.city_id) !== String(city_id._id)) {
      throw new Error(
        `District "${district_id.name}" does not belong to City "${city_id.name}".`
      );
    }

    if (String(ward_id.district_id) !== String(district_id._id)) {
      throw new Error(
        `Ward "${ward_id.name}" does not belong to District "${district_id.name}".`
      );
    }
  }
}

CustomerSchema.path("addresses").validate({
  validator: validateAddress,
  message: "Invalid city, district, or ward relationship",
});

const Customer = mongoose.model("customer", CustomerSchema);
module.exports = Customer;
