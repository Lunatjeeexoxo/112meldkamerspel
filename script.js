// Initialiseer de kaart
var map = L.map('map').setView([51.5, -0.09], 13);

// Voeg een tile layer toe (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Socket.io setup
var socket = io();

// Live chat functionaliteit
document.getElementById('chat-verzend').addEventListener('click', function() {
    var bericht = document.getElementById('chat-input').value;
    if (bericht) {
        socket.emit('chat bericht', bericht);
        document.getElementById('chat-input').value = '';
    }
});

// Ontvang chatberichten
socket.on('chat bericht', function(msg) {
    var berichtenDiv = document.getElementById('chat-berichten');
    var nieuweBericht = document.createElement('div');
    nieuweBericht.classList.add('bericht');
    nieuweBericht.innerHTML = "<strong>Ander:</strong> " + msg; // Vervang "Ander" door de naam van de gebruiker indien nodig
    berichtenDiv.appendChild(nieuweBericht);
});

// Meldingen beheren
var meldingen = []; // Array voor het opslaan van meldingen

// Voeg melding toe aan de kaart
document.getElementById('melding-verzend').addEventListener('click', function() {
    var melding = document.getElementById('melding-input').value;
    var lat = parseFloat(document.getElementById('lat-input').value);
    var lon = parseFloat(document.getElementById('lon-input').value);
    
    if (melding && !isNaN(lat) && !isNaN(lon)) {
        var nieuweMelding = { melding: melding, lat: lat, lon: lon };
        meldingen.push(nieuweMelding);
        voegMeldingToe(lat, lon, melding);
        document.getElementById('melding-input').value = ''; // Reset invoervelden
        document.getElementById('lat-input').value = '';
        document.getElementById('lon-input').value = '';
        
        // Stuur de melding naar de server
        socket.emit('melding toevoegen', nieuweMelding);
    }
});

// Voeg de melding toe aan de kaart
function voegMeldingToe(lat, lon, melding) {
    L.marker([lat, lon]).addTo(map).bindPopup(melding).openPopup();
}

// Ontvang meldingen van de server
socket.on('melding toegevoegd', function(melding) {
    voegMeldingToe(melding.lat, melding.lon, melding.melding);
});
