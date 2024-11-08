const verificationCodeExpire = 1000 * 60 * 10;
const accessTokenExpire = 1000 * 5;
const refreshTokenExpire = 1000 * 60 * 60 * 24 * 7;
const refreshTokenExpireRemember = 1000 * 60 * 60 * 24 * 30;
const defaultAvatar =
  "https://firebasestorage.googleapis.com/v0/b/nnmondayfoody.appspot.com/o/common%2Fdefault_avatar.jpg?alt=media&token=b9bf86c4-ddeb-4f54-ad7e-50e4caa322ea";
module.exports = {
  verificationCodeExpire,
  accessTokenExpire,
  refreshTokenExpire,
  refreshTokenExpireRemember,
  defaultAvatar,
};
