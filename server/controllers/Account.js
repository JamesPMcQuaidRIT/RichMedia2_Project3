const models = require('../models');

const Account = models.Account;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const fourofourPage = (req, res) => {
  res.redirect('/');
};

const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'Dear Adventurer, you must fill all fields' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'This name and passcode pair is invalid' });
    }


    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'Dear Adventurer, you must fill all fields' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Your given passcodes do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/maker' });
    });
    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already is use.' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

const changePassword = (request, response) => {
  const req = request;
  const res = response;

  if (!req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'Dear Adventurer you must fill all fields' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Your given passcodes do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const search = { username: req.session.account.username };
    const newPassword = { password: hash, salt };

    console.dir(search);

    return Account.AccountModel.findOneAndUpdate(search, { $set: newPassword }, (error) => {
      if (error) {
        return res.status(401).json({ error: 'Could not update passcode' });
      }
      return res.json({ redirect: '/marker' });
    });
  });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

module.exports.loginPage = loginPage;
module.exports.fourofour = fourofourPage;
module.exports.changePassword = changePassword;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getToken = getToken;
