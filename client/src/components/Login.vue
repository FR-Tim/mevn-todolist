<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Connexion</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <input v-model="username" placeholder="Nom d'utilisateur" required />
        </div>
        <div class="input-group">
          <input type="password" v-model="password" placeholder="Mot de passe" required />
        </div>
        <button type="submit" class="login-btn">Se connecter</button>
        <p v-if="error" class="error-msg">{{ error }}</p>
        <p v-if="success" class="success-msg">{{ success }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Utilisation du localStorage pour stocker le JWT
const username = ref('')
const password = ref('')
const error = ref('')
const success = ref('')

const login = async () => {
  error.value = ''
  success.value = ''

  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username.value, password: password.value })
  })

  if (res.ok) {
  const data = await res.json();
  console.log('Données reçues après login :', data); // <= ICI

  if (data.token) {
    localStorage.setItem('jwt', data.token);
  }
  success.value = `Bienvenue, ${data.username} !`;
} else {
    const err = await res.json()
    error.value = err.error || 'Erreur lors de la connexion.'
  }
}
</script>

<script>
export default {
    name: 'UserLogin'
}
</script>

<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-card {
    background: #fff;
    padding: 2.5rem 2rem;
    border-radius: 18px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

h2 {
    margin-bottom: 1.5rem;
    color: #3a3a3a;
    font-weight: 700;
    letter-spacing: 1px;
}

.input-group {
    width: 100%;
    margin-bottom: 1.2rem;
}

input {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: border 0.2s;
    background: #f7faff;
}

input:focus {
    border: 1.5px solid #66a6ff;
    background: #fff;
}

.login-btn {
    width: 100%;
    padding: 0.9rem;
    background: linear-gradient(90deg, #66a6ff 0%, #89f7fe 100%);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 0.5rem;
}

.login-btn:hover {
    background: linear-gradient(90deg, #89f7fe 0%, #66a6ff 100%);
}

.error-msg {
    color: #e74c3c;
    margin-top: 1rem;
    font-size: 0.98rem;
    text-align: center;
}

</style>