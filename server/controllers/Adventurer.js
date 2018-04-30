const models = require('../models');

const Adventurer = models.Adventurer;

const makerPage = (req, res) => {
  Adventurer.AdventurerModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), adventurers: docs });
  });
};

const makeAdventurer = (req, res) => {
  if (!req.body.name || !req.body.level || !req.body.strength
      || !req.body.dexterity || !req.body.intellect || !req.body.charisma) {
    return res.status(400).json({ error: 'Dear Adventurer, you must fill all fields' });
  }

  const totalStats = parseInt(req.body.strength, 10) + parseInt(req.body.dexterity, 10)
    + parseInt(req.body.intellect, 10) + parseInt(req.body.charisma, 10);

  const pointsAllowed = parseInt(req.body.level, 10) * 5;

  console.log(totalStats);
  console.log(pointsAllowed);

  if (totalStats > pointsAllowed) {
    return res.status(400).json({ error: 'That adventurer has too many stats for that level' });
  }

  const adventurerData = {
    name: req.body.name,
    level: req.body.level,
    strength: req.body.strength,
    dexterity: req.body.dexterity,
    intellect: req.body.intellect,
    charisma: req.body.charisma,
    class: req.body.class,
    owner: req.session.account._id,
  };

  const newAdventurer = new Adventurer.AdventurerModel(adventurerData);

  const adventurerPromise = newAdventurer.save();

  adventurerPromise.then(() => res.json({ redirect: '/maker' }));

  adventurerPromise.catch((err) => {
    console.log(err);

    if (err.code === 11000) {
      return res.status(400).json({ error: 'Adventurer already exsists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return adventurerPromise;
};

const getAdventurers = (request, response) => {
  const req = request;
  const res = response;

  return Adventurer.AdventurerModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ adventurer: docs });
  });
};

const levelUpAdventurer = (req, res) => {
  Adventurer.AdventurerModel.upLevel(req.session.account._id, req.body._id, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    console.dir(req.body);

    const adventurer = doc;

    adventurer.level++;

    const newAdventurer = new Adventurer.AdventurerModel(adventurer);

    const adventurerPromise = newAdventurer.save();

    adventurerPromise.then(() => res.json({ redirect: '/maker' }));

    return res.json({ adventurer: doc });
  });
};

module.exports.makerPage = makerPage;
module.exports.getAdventurers = getAdventurers;
module.exports.make = makeAdventurer;
module.exports.levelUp = levelUpAdventurer;
