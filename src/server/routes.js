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

router.post('/hero', checkRequestAuthenticationState, (req, res) => {
    heroService.postHero(req, res);
});

router.put('/hero/:id', checkRequestAuthenticationState, (req, res) => {
    heroService.putHero(req, res);
});

router.delete('/hero/:id', (req, res) => {
  heroService.deleteHero(req, res);
});

router.get('/login', passport.authenticate('twitter'));

router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

function checkRequestAuthenticationState(req, res, next){
  if(isAuthenticatedRequest(req)) {
    return next();
  } else {
    res.status(401).send({errorMessage: 'You must be logged in to create or update a hero'});
  }
}

function isAuthenticatedRequest (req) {
  console.log('is authenticated:', !!req.user);
  return !!req.user
}

module.exports = router;
