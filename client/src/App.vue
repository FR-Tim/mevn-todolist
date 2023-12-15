<template>
  <a href="#/">Home</a> |
  <a href="#/Category">Category</a> 
  <component :is="currentView" />
</template>


<script setup>

import { ref, computed } from 'vue'
import Home from './Home.vue'
import Category from './Category.vue'

const routes = {
  '/': Home,
  '/Category': Category
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/']
})

</script>


