require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const { jwtAuth } = require('./middleware/jwtAuth')


const authRoutes = require('./routes/auth')
const TodoListRoutes = require('./routes/api/Todolist')
const CategoryListRoutes = require('./routes/api/Categorylist')

const app = express()


// Middleware
app.use(cors())
app.use(express.json()) // body-parser json intégré

// Routes
app.use('/api/auth', authRoutes) // route publique
app.use('/api/todoList', jwtAuth, TodoListRoutes) // route sécurisée par jwtAuth
app.use('/api/categoryList', jwtAuth, CategoryListRoutes) // route sécurisée par jwtAuth

// Connexion MongoDB
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  console.error("MONGO_URI non défini dans le .env !")
  process.exit(1)
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connecté')
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`)
  })
})
.catch(err => {
  console.error('Erreur de connexion MongoDB :', err)
})
