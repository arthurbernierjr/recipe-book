require('dotenv').config();
console.log("🔑 MONGODB_URI from env:", process.env.MONGODB_URI);
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
const recipesController = require('./controllers/recipes');
app.use('/recipes', recipesController);

// Root route
app.get('/', (req, res) => res.redirect('/recipes'));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
