
    const express = require('express');
    const mongoose = require('mongoose');
    const Equipe = require('./equipeModel'); 

    const app = express();
    app.use(express.json());
    const PORT = process.env.PORT || 4000;

    mongoose.connect('mongodb://localhost:27017/equipe')
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch((err) => console.error('Erreur de connexion à MongoDB :', err));


    // app.get('/equipes', async (req, res) => {
    // try {
    //     const equipes = await Equipe.find();
    //     res.json(equipes);
    // } catch (err) {
    //     res.status(500).json({ message: err.message });
    // }
    // });
    app.post('/equipes', async (req, res) => {
        //const { id, equipe, pays } = req.body;
      
        try {
          const nouvelleEquipe = await Equipe.create(req.body);
        //   const equipeCreee = await nouvelleEquipe.save();
          res.status(201).json(equipeCreee);
        } catch (err) {
          res.status(200).json({message: err.message})
        }
      });

    app.delete('/equipes', async (req,res) =>{
        const newEquipe =req.body;
        await Equipe.deleteMany(newEquipe);
        const equipes =await Equipe.find();
        res.status(200).json(equipes);
    });

    app.put('/equipes/:id', async (req,res) =>{
        const id = req.params.id;
        const newEquipe =req.body;    
        await Equipe.updateOne({"id":id},newEquipe);
        const equipes =await Equipe.find();
        res.status(200).json(equipes);
    });


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
