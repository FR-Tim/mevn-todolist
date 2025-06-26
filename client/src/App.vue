<template>
  <header style="display: flex; justify-content: space-between; align-items: center;">
    <nav>
      <a href="#/">
        <button class="btn-primary">Home</button>
      </a>
      <a href="#/Category" style="margin-left: 5px;">
        <button class="btn-primary">Category</button>
      </a>
    </nav>
    <div>
      <span v-if="username" style="margin-right: 10px">👤 {{ username }}</span>
      <template v-if="!username">
        <a href="#/login">
          <button class="btn-primary">Login</button>
        </a>
        <a href="#/signup">
          <button class="btn-primary" style="margin-left: 5px;">Sign up</button>
        </a>
      </template>
      <button
        v-else
        @click="logout"
        class="btn-primary"
      >Logout</button>
    </div>
  </header>

  <component :is="currentView" />
</template>

<style>
.btn-primary {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}
.btn-primary:hover {
  background-color: #115293;
  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.13);
}
</style>

<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import Category from './Category.vue'
import UserLogin from './components/Login.vue'
import UserSignup from './components/Signup.vue' 

const username = ref(localStorage.getItem('username'))

const logout = () => {
  localStorage.removeItem('credentials')
  localStorage.removeItem('username')
  username.value = null
  window.location.hash = '/'
}

const routes = {
  '/': Home,
  '/Category': Category,
  '/login': UserLogin,
  '/signup': UserSignup 
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
  username.value = localStorage.getItem('username') // refresh après login/signup
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/']
})
</script>
