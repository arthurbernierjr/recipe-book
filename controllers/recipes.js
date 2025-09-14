const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// INDEX
router.get('/', async (req, res) => {
  const recipes = await Recipe.find();
  res.render('recipes/index', { recipes });
});

// NEW
router.get('/new', (req, res) => {
  res.render('recipes/new');
});

// CREATE
router.post('/', async (req, res) => {
  if (req.body.ingredients) {
    req.body.ingredients = req.body.ingredients.split(',').map(i => i.trim());
  }
  await Recipe.create(req.body);
  res.redirect('/recipes');
});

// SHOW
router.get('/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render('recipes/show', { recipe });
});

// EDIT
router.get('/:id/edit', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render('recipes/edit', { recipe });
});

// UPDATE
router.put('/:id', async (req, res) => {
  if (req.body.ingredients) {
    req.body.ingredients = req.body.ingredients.split(',').map(i => i.trim());
  }
  await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.redirect(`/recipes/${req.params.id}`);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.redirect('/recipes');
});

module.exports = router;
