const mongoose = require("mongoose");
const City = require("./city.model");
const District = require("./district.model");
const Ward = require("./ward.model");

const RestaurantSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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
  {
    timestamps: true,
  }
);

RestaurantSchema.pre("save", async function (next) {
  const address = this.address;

  const populatedAddress = await mongoose
    .model("restaurant")
    .populate(address, [
      { path: "city_id", model: City },
      { path: "district_id", model: District },
      { path: "ward_id", model: Ward },
    ]);

  const { city_id, district_id, ward_id } = populatedAddress;

  if (String(district_id.city_id) !== String(city_id._id)) {
    return next(
      new Error(
        `District "${district_id.name}" does not belong to City "${city_id.name}".`
      )
    );
  }

  if (String(ward_id.district_id) !== String(district_id._id)) {
    return next(
      new Error(
        `Ward "${ward_id.name}" does not belong to District "${district_id.name}".`
      )
    );
  }

  next();
});

RestaurantSchema.pre("remove", async function (next) {
  await Dish.deleteMany({ restaurant_id: this._id });
  next();
});

const Restaurant = mongoose.model("restaurant", RestaurantSchema);
module.exports = Restaurant;
