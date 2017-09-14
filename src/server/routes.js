const express = require('express');
const passport = require('passport');
const router = express.Router();

const heroService = require('./hero.service');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get('/heroes', (req, res) => {
  heroService.getHeroes(req, res);
});

router.post('/hero', isLoggedIn, (req, res) => {
  console.log(req.user);
  console.log('made it!');
  heroService.postHero(req, res);
});

router.put('/hero/:id', isLoggedIn, (req, res) => {
  heroService.putHero(req, res);
});

router.delete('/hero/:id', isLoggedIn, (req, res) => {
  heroService.deleteHero(req, res);
});

router.get('/login', passport.authenticate('twitter'));

router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
  // (req, res) => {
  //   // Successful authentication, redirect home.
  //   console.log('logged in!', req.user);
  //   res.redirect('/');
  // }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.send(200, {message: 'Hey, you should really reconsider and log back in. It\'s fun in here'})
  // res.redirect('/');
});

router.get('/profile', (req, res) => {
  let body;
  if (req.isAuthenticated()) {
    body = req.user;
  }
  res.send(200, body);
});

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the login page
  // res.redirect('/api/login');
  res.send(401, { message: 'unauthorized. please log in and try again' });
}
module.exports = router;
