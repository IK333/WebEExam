const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Hardcoded admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Login route
router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    if (username !== ADMIN_USERNAME) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare password (in real app, we'd use hashed password)
    if (password !== ADMIN_PASSWORD) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }

    try {
        const payload = {
            user: {
                id: 'admin',
                username: ADMIN_USERNAME
            }
        };

        jwt.sign(
            payload,
            JWT_SECRET, { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;