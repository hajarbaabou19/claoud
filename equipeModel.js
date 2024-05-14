// equipeModel.js

const mongoose = require('mongoose');

const equipeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  equipe: {
    type: String,
    required: true
  },
  pays: {
    type: String,
    required: true
  },win: {
    type: String,
    required: false
  }

});

const Equipe = mongoose.model('equipe', equipeSchema);

module.exports = Equipe;
