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
  if (!req.body.name || !req.body.level) {
    return res.status(400).json({ error: 'Dear Adventurer, you must fill all fields' });
  }

  const adventurerData = {
    name: req.body.name,
    level: req.body.level,
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
  Adventurer.AdventurerModel.upAge(req.session.account._id, req.body._id, (err, doc) => {
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
