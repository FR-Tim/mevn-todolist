const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/User')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

//  signup
router.post('/register', async (req, res) => {
  const { username, password } = req.body
  console.log('Données reçues pour inscription:', { username, password })

  if (!username || !password) {
    return res.status(400).json({ message: 'Champs manquants' })
  }

  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(409).json({ message: 'Utilisateur déjà existant' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('Mot de passe hashé:', hashedPassword)

    const newUser = new User({ username, password: hashedPassword })
    await newUser.save()

    console.log('Utilisateur enregistré avec succès')
    res.status(201).json({ message: 'Utilisateur créé avec succès' })
  } catch (err) {
    console.error('Erreur backend:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})


// Connexion via HTTP Basic Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  console.log('Tentative de connexion pour:', username)

  if (!username || !password) {
    console.log('Identifiants manquants')
    return res.status(400).json({ error: 'Identifiants manquants' })
  }

  try {
    const user = await User.findOne({ username })
    console.log('Utilisateur trouvé:', user)

    if (!user) {
      console.log('Utilisateur non trouvé en base de données')
      return res.status(401).json({ error: 'Utilisateur non trouvé' })
    }

    const valid = await bcrypt.compare(password, user.password)
    console.log('Résultat bcrypt.compare:', valid)
    console.log('Comparaison:', {
      passwordPlain: password,
      passwordHashed: user.password,
      resultat: valid
    })

    if (!valid) {
      console.log('Mot de passe incorrect')
      return res.status(401).json({ error: 'Mot de passe incorrect' })
    }

    // Génération du JWT
    const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString('base64url');
    const payload = Buffer.from(JSON.stringify({
      username: user.username,
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // expiration 1h
      iss: "todo-list-timothe"
    })).toString('base64url');

    const secret = 'token_long_et_complexe';
    const signature = crypto
      .createHmac('sha256', secret)
      .update(`${header}.${payload}`)
      .digest('base64url');

    const token = `${header}.${payload}.${signature}`;

    console.log('Connexion OK');
    console.log('Émetteur (iss):', "todo-list-timothe");

    res.json({
      message: 'Connexion réussie',
      username: user.username,
      token: token,
      iss: "todo-list-timothe"
    });

  } catch (err) {
    console.error('Erreur serveur:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})


// Middleware de vérification du JWT
const secret = 'token_long_et_complexe';  // Clé identique à celle utilisée pour signer


module.exports = router;