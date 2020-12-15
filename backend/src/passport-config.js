const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

module.exports = function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);

    if (user.length == 0) {
      return done(null, false);
    }

    try {
      if (await bcrypt.compare(password, user[0].passwordEncripted)) {
        return done(null, user[0]);
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy(authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => done(null, getUserById(id)));
};
