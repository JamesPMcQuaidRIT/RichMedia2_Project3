const models = require('../models');

const Mission = models.Mission;
let activeMission;

const missionPage = (req, res) => {
  Mission.MissionModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ mission: docs });
  });
};

const makeMission = (req, res) => {
  if (!req.body.title || !req.body.difficulty) {
    return res.status(400).json({ error: 'Dear Adventurer, you must fill all fields' });
  }

  const missionData = {
    title: req.body.title,
    difficulty: req.body.difficulty,
    type: req.body.type,
    owner: req.session.account._id,
  };

  const newMission = new Mission.MissionModel(missionData);

  const missionPromise = newMission.save();

  missionPromise.then(() => res.json({ redirect: '/maker' }));

  missionPromise.catch((err) => {
    console.log(err);

    if (err.code === 11000) {
      return res.status(400).json({ error: 'Mission already exsists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return missionPromise;
};

const getMissions = (request, response) => {
  const req = request;
  const res = response;

  return Mission.MissionModel.findByOwner(req.session.account._id, (err, docs) => {
    console.dir(docs);

    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ mission: docs });
  });
};

const performMission = (request, response) => {
  const req = request;
  const res = response;
    
    if (!req.body.adventurer || !req.body.weapon || !req.body.spell || !req.body.mission) {
        return res.status(400).json({ error: 'One of your options is invalid' });
    }
    
    const adventurer = JSON.parse(req.body.adventurer);
    const weapon = JSON.parse(req.body.weapon);
    const spell = JSON.parse(req.body.spell);
    const mission = JSON.parse(req.body.mission);
    
    var roll = Math.random() * 20;
    
    switch(mission.type){
        case "Extermination":
            if(adventurer.class === "Wizard"){
                roll += adventurer.intellect;
            } else if(adventurer.class === "Monk"){
                roll += adventurer.dexterity;
            } else if(adventurer.class === "Barbarian"){
                roll += adventurer.strength * 2
            } else {
                roll += adventurer.strength;
            } 
            break;
        case "Diplomatic":
            if(adventurer.class === "Paladin"){
                roll += adventurer.charisma * 2;
            } else {
                roll += adventurer.charisma;
            } 
            break;
        case "Research":
            if(adventurer.class === "Wizard"){
                roll += adventurer.intellect * 2;
            } else if(adventurer.class === "Barbarian"){
                roll += adventurer.intellect/2;
            } else if(adventurer.class === "Rogue"){
                roll += adventurer.intellect + adventurer.dexterity/2;
            }else {
                roll += adventurer.intellect;
            } 
            break;
        case "Assassination":
            if(adventurer.class === "Rogue"){
                roll += adventurer.dexterity * 2;
            } else if(adventurer.class === "Barbarian"){
                roll += adventurer.dexterity + adventurer.strength/2;
            } else if(adventurer.class === "Paladin"){
                roll += adventurer.dexterity - adventurer.charisma;
            }else {
                roll += adventurer.dexterity;
            } 
            break;
        case "Exploration":
            if(adventurer.class === "Wizard"){
                roll += adventurer.intellect - (10 - adventurer.strength);
            } else if(adventurer.class === "Barbarian"){
                roll += adventurer.intellect/2 + adventurer.strength/2;
            } else if(adventurer.class === "Paladin"){
                roll += adventurer.intellect/2 + adventurer.charisma/2;
            } else {
                roll += adventurer.intellect;
            } 
            break;
       case "Trade":
            if(adventurer.class === "Paladin"){
                roll += adventurer.charisma * 2;
            } else if(adventurer.class === "Barbarian"){
                roll += adventurer.charisma/2 + adventurer.strength/2;
            } else if(adventurer.class === "Wizard"){
                roll += adventurer.intellect/2 + adventurer.charisma/2;
            } else if(adventurer.class === "Rogue"){
                roll += adventurer.charisma * 1.5;
            } else {
                roll += adventurer.charisma;
            } 
            break;
        case "Thievery":
            if(adventurer.class === "Rogue"){
                roll += adventurer.dexterity * 2;
            } else if(adventurer.class === "Barbarian"){
                roll += adventurer.dexterity - (adventurer.strength - adventurer.intellect);
            } else if(adventurer.class === "Paladin"){
                roll += adventurer.dexterity - adventurer.charisma;
            } else {
                roll += adventurer.dexterity;
            } 
            break;
        default:
            break;
    }

    var result;
    
    if(roll < mission.difficulty){
        result = "failure";
    } else {
        result = "success";
    }
    
    Mission.MissionModel.changeStatus(req.session.account._id, mission._id, (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: 'An error occured' });
        }
        
        activeMission = mission._id;

        const miss = doc;
        
        miss.status = result;
        
        const newMission = new Mission.MissionModel(miss);
        
        const missionPromise = newMission.save();
        
        missionPromise.then(() => res.json({ redirect: '/maker' }));

        return res.json({ mission: doc });
    });
};

const updateMessage = (request, response) => {
  const req = request;
  const res = response;
    
  Mission.MissionModel.changeStatus(req.session.account._id, activeMission, (err, doc) => { 
      if (err) {
          console.log(err);
          return res.status(400).json({ error: 'An error occured' });
      }
      
      return res.json({ mission: doc });
  });
  
};


module.exports.missionPage = missionPage;
module.exports.getMissions = getMissions;
module.exports.makeMission = makeMission;
module.exports.performMission = performMission;
module.exports.updateMessage = updateMessage;
