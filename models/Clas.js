const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique:true
  },
  persoId: {
    type: mongoose.Types.ObjectId,
    ref: 'Personel',
    required: true,
  },
}, { timestamps: true });

const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;