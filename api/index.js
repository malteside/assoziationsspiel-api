const express = require("express");
const app = express();

app.use(express.json());

const rooms = {};

app.post("/api/submit", (req, res) => {
  const { room, player, word } = req.body;
  if (!rooms[room]) rooms[room] = {};
  rooms[room][player] = word;
  res.send({ message: "Wort gespeichert" });
});

app.get("/api/result", (req, res) => {
  const { room } = req.query;
  const roomData = rooms[room];
  if (!roomData || Object.keys(roomData).length < 2) {
    return res.send({ match: false, message: "Warten auf beide Spieler" });
  }

  const [w1, w2] = Object.values(roomData);
  const match = w1.toLowerCase() === w2.toLowerCase();
  delete rooms[room];

  res.send({ match, w1, w2 });
});

module.exports = app;