const models = require('../models');

const Mission = models.Mission;

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
    console.log(roll);
    
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
        default:
            break;
    }

    console.log(roll);
    
    if(roll < mission.difficulty){
        console.log("failure");
    } else {
        console.log("success");
    }
    
        
    return res.json({ success: "placeholder"});;
};


module.exports.missionPage = missionPage;
module.exports.getMissions = getMissions;
module.exports.makeMission = makeMission;
module.exports.performMission = performMission;
