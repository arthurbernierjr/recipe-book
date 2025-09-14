const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Food', 'Drink'], default: 'Food' },
  cuisine: { type: String, enum: ['Italian', 'Puerto Rican'], required: true },
  ingredients: [String],
  instructions: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  imageUrl: String,
});

module.exports = mongoose.model('Recipe', recipeSchema);
