const express = require('express');
const router = express.Router();

const heroService = require('./hero.service');

router.get('/heroes', (req, res) => {
  heroService.getHeroes(req, res);
});

router.post('/hero', (req, res) => {
  heroService.postHero(req, res);
});

router.put('/hero/:uid', (req, res) => {
  heroService.putHero(req, res);
});

router.delete('/hero/:uid', (req, res) => {
  heroService.deleteHero(req, res);
});

module.exports = router;
