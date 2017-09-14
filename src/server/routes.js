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

router.post('/hero', passport.authenticate('twitter'), (req, res) => {
  console.log(req.user);
  console.log('made it!');
  heroService.postHero(req, res);
});

router.put('/hero/:id', (req, res) => {
  heroService.putHero(req, res);
});

router.delete('/hero/:id', (req, res) => {
  heroService.deleteHero(req, res);
});

router.get('/login', passport.authenticate('twitter'));

router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' })
  // (req, res) => {
  //   // Successful authentication, redirect home.
  //   console.log('logged in!', req.user);
  //   res.redirect('/');
  // }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
