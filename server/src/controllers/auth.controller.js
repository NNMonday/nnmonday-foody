const { AuthService, UserService } = require("../services");

const register = async (req, res, next) => {
  try {
    const { name, username, email, password, role } = req.body;
    await AuthService.register({
      role,
      name,
      username,
      email,
      password,
    });
    res.status(201).json({
      message:
        "Register successfully! Please check your email inbox for verification email",
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationCode } = req.params;
    await AuthService.verifyEmail(verificationCode);
    res.status(200).json({
      message: "Successfully verified, now you can login",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password, rememberMe } = req.body;
    const { user, accessToken } = await AuthService.login({
      username,
      password,
      rememberMe,
    });
    res.cookie("accessToken", accessToken.value, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    res.status(200).json({
      message: "Login successfully",
      data: { ...user },
    });
  } catch (error) {
    next(error);
  }
};

const checkAuth = async (req, res, next) => {
  try {
    res.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.set("Expires", "0");
    res.set("Pragma", "no-cache");
    res.set("Surrogate-Control", "no-store");
    const token = req.cookies.accessToken;
    const user = await AuthService.checkAuth(token);
    res.status(200).json({
      message: "Check auth successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.decodedToken;
    await AuthService.logout(_id);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({
      message: "Logout successfully",
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { _id } = req.decodedToken;
    const refreshToken = req.cookies.refreshToken;
    const { user, accessToken } = await AuthService.refreshToken(
      _id,
      refreshToken
    );

    res.cookie("accessToken", accessToken.value, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    res.status(200).json({
      message: "Refresh token successfully",
      data: { ...user },
    });
  } catch (error) {
    next(error);
  }
};

const AuthController = {
  register,
  verifyEmail,
  login,
  checkAuth,
  logout,
  refreshToken,
};

module.exports = AuthController;
