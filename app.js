const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const bcrypt = require('bcrypt');

const users = []; // In-memory "database"


app.get('/', (req, res) => {
  res.send('Welkom bij het Dispatch systeem!');
});

app.use(session({
    secret: 'test123', // Verander dit in iets veils
    resave: false,
    saveUninitialized: true
  }));

  // Registratie
app.post('/register', express.json(), (req, res) => {
    const { username, password, role } = req.body; // rol: 'chauffeur' of 'dispatcher'
    
    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ username, password: hashedPassword, role });
    
    res.send('Registratie succesvol!');
  });
  
  // Inloggen
  app.post('/login', express.json(), (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
  
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = { username: user.username, role: user.role };
      res.send('Inloggen succesvol!');
    } else {
      res.status(401).send('Ongeldige inloggegevens');
    }
  });
  
  
app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
