const { User } = require("../models");

const create = async ({ role, name, username, email, hashedPassword }) => {
  const newUser = new User({
    role,
    name,
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  return newUser._id;
};

const findOneByEmail = async (email) => {
  return await User.findOne({ email })
    .select("-password -createdAt -updatedAt -verify -__v -refreshToken")
    .populate("role", "name")
    .exec()
    .then((u) => u && u.toObject());
};

const findOneById = async (id) => {
  return await User.findById(id)
    .select("-password -createdAt -updatedAt -verify -__v -refreshToken")
    .populate("role", "name")
    .exec()
    .then((u) => u && u.toObject());
};

const verifyEmail = async (id) => {
  return await User.findByIdAndUpdate(id, { verify: true }, { new: true })
    .select("-password -createdAt -updatedAt -verify -__v -refreshToken")
    .populate("role", "name")
    .exec()
    .then((u) => u && u.toObject());
};

const findOneByUsername = async (username = "") => {
  return await User.findOne({ username })
    .select("-password -createdAt -updatedAt -verify -__v -refreshToken")
    .populate("role", "name")
    .exec()
    .then((u) => u && u.toObject());
};

const isVerify = async (_id) => {
  const { verify } = await User.findById(_id).select("verify").exec();
  return verify;
};

const getPassword = async (_id) => {
  const { password } = await User.findById(_id)
    .select("password")
    .exec()
    .then((u) => u.toObject());

  return password;
};

const findRoleById = async (_id) => {
  return await User.findById(_id)
    .populate("role", "name")
    .select("role")
    .exec();
};

const removeRefreshToken = async (_id) => {
  return await User.findByIdAndUpdate(_id, {
    $set: { refreshToken: null },
  }).exec();
};

const findOneByRefreshToken = async (refreshToken) => {
  return await User.findOne({ refreshToken }).exec();
};

const updateRefreshTokenById = async (_id, refreshToken) => {
  return await User.findByIdAndUpdate(_id, {
    $set: { refreshToken },
  }).exec();
};

const UserRepository = {
  create,
  findOneByEmail,
  findOneById,
  verifyEmail,
  findOneByUsername,
  isVerify,
  getPassword,
  findRoleById,
  removeRefreshToken,
  findOneByRefreshToken,
  updateRefreshTokenById,
};

module.exports = UserRepository;
