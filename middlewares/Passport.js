const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { fromAuthHeaderAsBearerToken } = require('passport-jwt').ExtractJwt;
const Author = require('../models/Author');
const LocalStrategy = require('passport-local').Strategy;


const opts = {
  jwtFromRequest: fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const author = await Author.findById(payload._id);
  
        if (!author) {
          return done(null, false);
        }
  
        return done(null, author);
      } catch (error) {
        return done(error, false);
      }
    })
    );
    const localStrategy = new LocalStrategy();
passport.use('local', localStrategy);

const jwtStrategy = new JwtStrategy();
passport.use('jwt', jwtStrategy);

module.exports = passport;