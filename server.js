const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let meldingen = []; // Voor het opslaan van meldingen

app.use(express.static('public'));

// Socket.io voor realtime chat
io.on('connection', (socket) => {
    console.log('Een gebruiker is verbonden');

    // Ontvang chatberichten
    socket.on('chat bericht', (msg) => {
        io.emit('chat bericht', msg); // Stuur het bericht naar alle clients
    });

    // Ontvang meldingen
    socket.on('melding toevoegen', (melding) => {
        meldingen.push(melding);
        io.emit('melding toegevoegd', melding); // Stuur de melding naar alle clients
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server luistert op poort ${PORT}`);
});
