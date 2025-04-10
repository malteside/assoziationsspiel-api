const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware, um JSON-Daten zu parsen
app.use(express.json());

// Beispielroute für die Startseite der API
app.get('/', (req, res) => {
  res.send('Willkommen beim Assoziationsspiel API!');
});

// Beispiel-API-Route für das Assoziationsspiel
app.post('/assoziationsspiel', (req, res) => {
  const { thema, player1, player2 } = req.body;

  // Simulierte Antwort: Beide Spieler müssen ein Wort zum Thema nennen
  if (thema && player1 && player2) {
    // Hier könntest du die Logik für das Spiel und die Bewertung der Eingaben einfügen
    // Zum Beispiel, wenn die Spieler dasselbe Wort schreiben, gibt es einen Punkt:
    const punkt = player1 === player2 ? 1 : 0;
    res.json({
      message: `Thema: ${thema}`,
      player1,
      player2,
      punkt,
    });
  } else {
    res.status(400).json({ message: 'Fehlende Eingabedaten. Bitte Thema und Wörter der Spieler angeben.' });
  }
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
