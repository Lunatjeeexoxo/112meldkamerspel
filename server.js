// server.js

const express = require('express');
const app = express();

app.use(express.json());

let busPosition = { x: 0, y: 0, z: 0 };  // Opslag voor de buspositie

// Ontvang de buspositie van Roblox
app.post('/updatePosition', (req, res) => {
    busPosition = req.body;  // Update de buspositie
    console.log('Buspositie bijgewerkt:', busPosition);
    res.status(200).send('Buspositie ontvangen');
});

// Verzend de buspositie naar de website
app.get('/getPosition', (req, res) => {
    res.json(busPosition);
});

// Start de server op poort 3000
app.listen(3000, () => {
    console.log('Server draait op poort 3000');
});
