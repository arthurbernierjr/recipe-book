const mongoose = require('mongoose');
const Recipe = require('./models/recipe');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedRecipes = [
  {
    name: 'Mofongo',
    type: 'Food',
    cuisine: 'Puerto Rican',
    ingredients: ['Plantains', 'Garlic', 'Olive Oil', 'Chicharrón'],
    instructions: 'Fry plantains, mash with garlic and chicharrón, form balls, serve with broth.',
    difficulty: 'Medium',
    imageUrl: 'https://example.com/mofongo.jpg'
  },
  {
    name: 'Spaghetti Carbonara',
    type: 'Food',
    cuisine: 'Italian',
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan Cheese', 'Black Pepper'],
    instructions: 'Cook spaghetti, mix with beaten eggs, pancetta, and cheese off heat to create creamy sauce.',
    difficulty: 'Medium',
    imageUrl: 'https://example.com/carbonara.jpg'
  },
  {
    name: 'Espresso Martini',
    type: 'Drink',
    cuisine: 'Italian',
    ingredients: ['Vodka', 'Coffee Liqueur', 'Espresso', 'Sugar Syrup'],
    instructions: 'Shake all ingredients with ice and strain into martini glass.',
    difficulty: 'Easy',
    imageUrl: 'https://example.com/espresso-martini.jpg'
  }
];

const seedDB = async () => {
  await Recipe.deleteMany({});
  await Recipe.insertMany(seedRecipes);
  console.log('✅ Database seeded!');
};

seedDB().then(() => {
  mongoose.connection.close();
});
