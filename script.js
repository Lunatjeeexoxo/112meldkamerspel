// Initialiseer de Leaflet kaart
var map = L.map('map').setView([50.9375, 4.0422], 10); // Startpositie (bijvoorbeeld Brussel)

// Voeg de OpenStreetMap tegel laag toe
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Functie om een melding op de kaart toe te voegen
function voegMeldingToe(lat, lon, melding) {
    L.marker([lat, lon]).addTo(map)
        .bindPopup(melding)
        .openPopup();
}

// Voorbeeld: voeg een melding toe
voegMeldingToe(50.9375, 4.0422, "Ongeval op Lijn 5");
