const fs = require("fs");

module.exports = {
  loadAvatarBase64(pathImage) {
    return `data:image/png;base64, ${fs.readFileSync(pathImage, "base64")}`;
  },

  deleteAvatar(pathImage) {
    fs.unlink(pathImage);
  },
};
