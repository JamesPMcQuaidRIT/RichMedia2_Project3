const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let AdventurerModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const AdventurerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  level: {
    type: Number,
    min: 1,
    required: true,
  },

  class: {
    type: String,
    required: true,
  },

  strength: {
    type: Number,
    min: 0,
    required: true,
  },

  dexterity: {
    type: Number,
    min: 0,
    required: true,
  },

  intellect: {
    type: Number,
    min: 0,
    required: true,
  },

  charisma: {
    type: Number,
    min: 0,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

AdventurerSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  level: doc.level,
  class: doc.class,
  strength: doc.strength,
  dexterity: doc.dexterity,
  intellect: doc.intellect,
  charisma: doc.charisma,
});

AdventurerSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return AdventurerModel.
  find(search).
  select('name level class strength dexterity intellect charisma').
  exec(callback);
};

AdventurerSchema.statics.upLevel = (ownerId, searchedId, callback) => {
  const search = {
    owner: convertId(ownerId),
    _id: convertId(searchedId),
  };


  return AdventurerModel.findOne(search).exec(callback);
};

AdventurerModel = mongoose.model('Adventurer', AdventurerSchema);

module.exports.AdventurerModel = AdventurerModel;
module.exports.AdventurerSchema = AdventurerSchema;
