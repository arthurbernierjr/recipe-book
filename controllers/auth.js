const express = require('express');
const router = express.Router();
const User = require('../models/users');

// Show register form
router.get('/register', (req, res) => res.render('auth/register'));

// Handle register
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new User({ email, password });
        await user.save();
        req.session.userId = user._id;
        res.redirect('/recipes');
    } catch (err) {
        console.error('❌ Registration error:', err);
        res.status(500).send('Error registering user');
    }
});

// Show login form
router.get('/login', (req, res) => res.render('auth/login'));

// Handle login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.send('Invalid credentials');
        }
        req.session.userId = user._id;
        res.redirect('/recipes');
    } catch (err) {
        console.error('❌ Login error:', err);
        res.status(500).send('Error logging in');
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = router;
