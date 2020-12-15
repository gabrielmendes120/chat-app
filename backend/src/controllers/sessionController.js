const connection = require("../database/connection");
const avatarFileHelper = require("../helper/avatarFileHelper");

module.exports = {
  async getUserByEmail(email) {
    const user = await connection("users")
      .where("email", email)
      .catch(() => {
        return done(null, false);
      });

    return user;
  },

  async getUserById(id) {
    const user = await connection("users")
      .where("id", id)
      .then((infoUser) => {
        if (infoUser.length === 0) {
          return done(null, false);
        }
        return infoUser[0];
      })
      .catch(() => {
        return done(null, false);
      });

    user.imageBase64 = avatarFileHelper.loadAvatarBase64(user.pathImage);

    return user;
  },
};
