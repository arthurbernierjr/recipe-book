require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'superSecretKey123',
    resave: false,
    saveUninitialized: true
}));

// Make userId available in EJS templates
app.use((req, res, next) => {
    res.locals.userId = req.session.userId || null;
    next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
const authController = require('./controllers/auth');
const recipesController = require('./controllers/recipes');

app.use('/', authController);
app.use('/recipes', recipesController);

// Root route
app.get('/', (req, res) => {
    if (req.session.userId) {
        res.redirect('/recipes');
    } else {
        res.redirect('/login');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
