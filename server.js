require('dotenv').config();
console.log("🔑 MONGODB_URI from env:", process.env.MONGODB_URI);

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');

const authController = require('./controllers/auth');
const recipesController = require('./controllers/recipes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Session middleware (must come BEFORE routes that use sessions)
app.use(session({
    secret: 'yourSuperSecretKey', // change this!
    resave: false,
    saveUninitialized: true
}));

// Auth routes (login/register)
app.use('/', authController);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Recipe routes
app.use('/recipes', recipesController);

// Root route
app.get('/', (req, res) => res.redirect('/recipes'));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
