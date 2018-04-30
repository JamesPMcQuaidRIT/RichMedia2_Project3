const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let MissionModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const MissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  difficulty: {
    type: Number,
    min: 0,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },
    
  status: {
      type: String,
      default: "failure",
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

MissionSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  level: doc.level,
  purpose: doc.purpose,
});

MissionSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return MissionModel.find(search).select('title difficulty type').exec(callback);
};

MissionSchema.statics.changeStatus = (ownerId, searchedId, callback) => {
  const search = {
    owner: convertId(ownerId),
    _id: convertId(searchedId),
  };

  return MissionModel.findOne(search).exec(callback);
};



MissionModel = mongoose.model('Mission', MissionSchema);

module.exports.MissionModel = MissionModel;
module.exports.MissionSchema = MissionSchema;
