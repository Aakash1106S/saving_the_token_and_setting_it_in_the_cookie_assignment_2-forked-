require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Endpoint to generate a JWT
app.post('/login', (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).send('Username is required!');
    }

    // Create a payload
    const payload = { username };

    // Generate the token with expiry
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });

    res.json({ token });
});

// Protected route to verify the token
app.get('/protected', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('Token is required!');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        res.json({ message: 'Access granted!', user: decoded });
    } catch (error) {
        res.status(401).send('Token expired or invalid!');
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
