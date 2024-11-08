const bcrypt = require("bcryptjs");
const httpErrors = require("http-errors");
const jwt = require("jsonwebtoken");

const {
  UserRepository,
  CustomerRepository,
  RoleRepository,
  RestaurantRepository,
} = require("../repositories");
const { sendVerificationEmail } = require("../ultis/nodemailer.utils");
const {
  getIdFromVerificationCode,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../ultis/jwt.utils");
const {
  validateEmailFormat,
  checkUsedEmail,
  validatePassword,
  validateEmptyFields,
  existRole,
} = require("../ultis/validateFunctions");

const register = async ({
  role = "",
  name = "",
  username = "",
  email = "",
  password = "",
}) => {
  if (
    !validateEmptyFields({
      role,
      name,
      username,
      email,
      password,
    })
  ) {
    throw httpErrors.BadRequest("Empty fields are not allowed");
  }
  if (!validateEmailFormat(email)) {
    throw httpErrors.BadRequest("Invalid email format");
  }
  if (await checkUsedEmail(email)) {
    throw httpErrors.Conflict("Email already in use");
  }
  if (!validatePassword(password)) {
    throw httpErrors.BadRequest("Password does not meet enough criteria");
  }
  if (!existRole(role)) {
    throw httpErrors.BadRequest("Role does not exist");
  }

  const hashedPassword = bcrypt.hashSync(
    password,
    bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND, 10))
  );
  const _id = await UserRepository.create({
    role,
    name,
    username,
    email,
    // hashedPassword: password,
    hashedPassword: hashedPassword,
  });

  console.log((await RoleRepository.findOneById(role)).name);

  if ((await RoleRepository.findOneById(role)).name === "restaurant") {
    await RestaurantRepository.create(_id);
  } else {
    await CustomerRepository.create(_id);
  }

  await sendVerificationEmail({ email, _id });
  return;
};

const verifyEmail = async (verificationCode) => {
  try {
    const _id = getIdFromVerificationCode(verificationCode);
    const user = await UserRepository.findOneById(_id);
    if (!user) {
      throw httpErrors.NotFound("User not found");
    } else if (user.verify) {
      throw httpErrors.Conflict("This user is already verified");
    } else {
      await UserRepository.verifyEmail(_id);
      return;
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const { _id } = jwt.decode(verificationCode);
      const user = await UserRepository.findOneById(_id);
      if (!user) {
        throw httpErrors.NotFound("User not found");
      }
      await sendVerificationEmail({ email: user.email, _id });
      throw httpErrors.Unauthorized(
        "Verification token has expired. A new verification email has been sent."
      );
    } else {
      throw err;
    }
  }
};

const login = async ({ username, password, rememberMe }) => {
  let user;
  if (validateEmailFormat(username)) {
    user = await UserRepository.findOneByEmail(username);
  } else {
    user = await UserRepository.findOneByUsername(username);
  }

  if (!user) {
    throw httpErrors.NotFound("Username or email incorrect");
  }

  const isVerify = await UserRepository.isVerify(user._id);
  if (!isVerify) {
    throw httpErrors.Forbidden(
      "Account not verified. Please verify your email address before logging in."
    );
  }

  if (
    !bcrypt.compareSync(password, await UserRepository.getPassword(user._id))
  ) {
    // } else if (!password === user.password) {
    throw httpErrors.BadRequest("Password incorrect");
  }

  await UserRepository.updateRefreshTokenById(
    user._id,
    generateRefreshToken(user._id, rememberMe).value
  );

  return {
    user,
    accessToken: generateAccessToken(user._id),
  };
};

const checkAuth = async (token) => {
  try {
    if (!token) {
      throw httpErrors.Unauthorized("Token not found");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserRepository.findOneById(decodedToken._id);
    if (!user) {
      throw httpErrors.NotFound("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const logout = async (userId) => {
  try {
    await UserRepository.removeRefreshToken(userId);
    return;
  } catch (error) {
    throw error;
  }
};

const refreshToken = async (_id, refreshToken) => {
  try {
    const user = await UserRepository.findOneById(_id);
    if (!user) {
      throw httpErrors.NotFound("User not found");
    }
    if (refreshToken !== user.refreshToken) {
      throw httpErrors.Unauthorized("Invalid refresh token");
    }
    const { _id } = verifyRefreshToken(refreshToken);
    return {
      user: await UserRepository.findOneById(_id),
      accessToken: generateAccessToken(_id),
    };
  } catch (error) {
    throw error;
  }
};

const AuthService = {
  register,
  verifyEmail,
  login,
  checkAuth,
  logout,
  refreshToken,
};

module.exports = AuthService;
