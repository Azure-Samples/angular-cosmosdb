const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const env = require('../env/' + (process.env.NODE_ENV || 'development'));

if (env.twitter.consumerKey) {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: env.twitter.consumerKey,
        consumerSecret: env.twitter.consumerSecret,
        callbackURL: env.twitter.callbackURL
      },
      (token, tokenSecret, profile, done) => {
        // find the user in this app's database using their twitter account
        return done(null, profile);
      }
    )
  );
}

// Used to serialize the user details into the app's session store
passport.serializeUser((user, done) => {
  done(null, user);
});

// Used to deserialize the users details from the app's session store
passport.deserializeUser((user, done) => {
  done(null, user);
});
