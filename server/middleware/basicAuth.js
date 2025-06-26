const User = require('../models/User');

module.exports = async function (req, res, next) {
  const b64 = (req.headers.authorization || '').split(' ')[1] || '';
  const [username, password] = Buffer.from(b64, 'base64').toString().split(':');

  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    res.set('WWW-Authenticate', 'Basic realm="Accès restreint"');
    return res.status(401).json({ error: 'Accès refusé' });
  }

  req.user = user;
  next();
};
