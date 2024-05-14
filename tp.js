const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Lecture des joueurs depuis le fichier JSON
let joueurs = JSON.parse(fs.readFileSync('joueurs.json', 'utf-8'));

// GET - Récupérer tous les joueurs
app.get('/joueurs', (req, res) => {
  res.json(joueurs);
});

// GET - Récupérer un joueur par son ID
app.get('/joueurs/:id', (req, res) => {
  const joueur = joueurs.find(joueur => joueur.id === parseInt(req.params.id));
  if (!joueur) {
    return res.status(404).send('Joueur non trouvé');
  }
  res.json(joueur);
});

// POST - Créer un nouveau joueur
app.post('/joueurs', (req, res) => {
  const nouveauJoueur = req.body;
  joueurs.push(nouveauJoueur);
  fs.writeFileSync('joueurs.json', JSON.stringify(joueurs));
  res.status(201).send('Joueur créé avec succès');
});

// PUT - Mettre à jour un joueur par son ID
app.put('/joueurs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const joueurIndex = joueurs.findIndex(joueur => joueur.id === id);
  if (joueurIndex === -1) {
    return res.status(404).send('Joueur non trouvé');
  }
  joueurs[joueurIndex] = req.body;
  fs.writeFileSync('joueurs.json', JSON.stringify(joueurs));
  res.send('Joueur mis à jour avec succès');
});

// DELETE - Supprimer un joueur par son ID
app.delete('/joueurs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  joueurs = joueurs.filter(joueur => joueur.id !== id);
  fs.writeFileSync('joueurs.json', JSON.stringify(joueurs));
  res.send('Joueur supprimé avec succès');
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
// GET - Récupérer les joueurs d'une équipe par son ID
app.get('/equipes/:id/joueurs', (req, res) => {
  const equipeId = parseInt(req.params.id);
  const joueursEquipe = joueurs.filter(joueur => joueur.idEquipe === equipeId);
  res.json(joueursEquipe);
});
