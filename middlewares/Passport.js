const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const Author = require("../models/Author");
const LocalStrategy = require("passport-local").Strategy;
const dotenv = require("dotenv");
dotenv.config();

// const opts = {
//   jwtFromRequest: fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.JWT_SECRET,
// };
// passport.use(
//     new JwtStrategy(opts, async (payload, done) => {
//       try {
//         const author = await Author.findById(payload._id);

//         if (!author) {
//           return done(null, false);
//         }

//         return done(null, author);
//       } catch (error) {
//         return done(error, false);
//       }
//     })
//     );
//     const localStrategy = new LocalStrategy();
// passport.use('local', localStrategy);

// const jwtStrategy = new JwtStrategy();
// passport.use('jwt', jwtStrategy);

// module.exports = passport;

const jwtOptions = {
  jwtFromRequest: fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtCallback = async (payload, done) => {
  try {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (payload.exp <= currentTimestamp) {
      return done(null, false);
    }
    const auth = await Author.findOne({ _id: payload.sub });

    if (!author) {
      return done(null, false);
    }
    return done(null, author);
  } catch (error) {
    return done(error, false);
  }
};
const jwtStrategy = new JWTStrategy(jwtOptions, jwtCallback);
passport.use(jwtStrategy);
