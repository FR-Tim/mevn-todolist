const jwt = require('jsonwebtoken');
const secret = 'token_long_et_complexe'; // même que pour signer

const jwtAuth = (req, res, next) => {
    console.log('Headers Authorization:', req.headers['authorization'])
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token manquant' });

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token invalide' });
        req.user = user;
        next();
    });
};

module.exports = { jwtAuth };
