const mongoose = require("mongoose");
const { defaultAvatar } = require("../ultis/magic");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    username: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "Username is already taken"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already taken"],
      validate: {
        validator: function (email) {
          const re = /^[\w.-]+@[\w.-]+\.\w{2,3}$/;
          return re.test(email);
        },
        message: "Please provide a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: String,
      default: defaultAvatar,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
    },
    phone: {
      type: String,
      validate: {
        validator: function (phone) {
          const re = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
          return re.test(phone);
        },
        message: "Please provide a valid phone number",
      },
    },
    status: {
      type: Boolean,
      default: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
