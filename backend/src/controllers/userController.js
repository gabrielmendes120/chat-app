const connection = require("../database/connection");
const avatarFileHelper = require("../helper/avatarFileHelper");
const bcrypt = require("bcrypt");

module.exports = {
  async validateIsAuthenticated(request, response, next) {
    console.log(request.session);
    if (request.isAuthenticated()) return response.status(200).json();
    return response.status(401).json();
  },

  async create(request, response) {
    const { email, password, username } = request.body;
    const pathImage = request.file.path;

    await connection("users")
      .where("email", email)
      .then((email) => {
        if (email.length != 0){
          return response.status(409).json({ msgError: "Email is already registered" });
        }
      })
      .catch(() => {
        return response.status(500).json();
      });

    const passwordEncripted = await bcrypt.hash(password, 10);

    const [id] = await connection("users")
      .insert({
        email,
        passwordEncripted,
        username,
        pathImage,
      })
      .catch(() => {
        avatarFileHelper.deleteAvatar(pathImage);
        return response.status(500).json();
      });

    return response.status(201).json({ id });
  },

  async getUserById(request, response) {
    const { id } = request.params;

    const user = await connection("users")
      .where("id", id)
      .first()
      .then((infoUser) => {
        if (typeof infoUser === "underfined" || infoUser == null) {
          return response.status(404).json({ msgError: "User not found" });
        }
        return infoUser;
      })
      .catch(() => {
        return response.status(500).json();
      });

    user.imageBase64 = avatarFileHelper.loadAvatarBase64(user.pathImage);

    return response.status(200).json(user);
  },

  async saveUserChatOnline(user) {
    const { email, username, pathImage } = user;

    const userOnline = await connection("usersOnline")
      .where("email", email)
      .first();

    if (typeof userOnline != "underfined" && userOnline != null) {
      return userOnline.id;
    }

    return await connection("usersOnline").insert({
      email,
      username,
      pathImage,
    });
  },

  async getAllUsersChatOnline() {
    const users = await connection("usersOnline").select("*");
    users.forEach((user) => {
      user.imageBase64 = avatarFileHelper.loadAvatarBase64(user.pathImage);
    });
    return users;
  },

  async removeUserChatOnline(id) {
    await connection("usersOnline").where("id", id).delete();
  },
};
