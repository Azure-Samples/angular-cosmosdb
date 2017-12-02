const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

// TODO: This disables security if we have no key.
//       NOT A GOOD IDEA FOR PRODUCTION!
if (process.env.TWITTER_CLIENT_SECRET) {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CLIENT_KEY,
        consumerSecret: process.env.TWITTER_CLIENT_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL
      },
      (token, tokenSecret, profile, done) => {
        // find the user in this app's database using their twitter account
        done(null, profile);
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
