<template>
  <div class="main">
    <h3>
      <span class="icon">📝</span>
      Todo List
    </h3>
    <form class="form" @submit.prevent="addTodo">
      <input class="input" v-model="title" type="text" name="name" placeholder="Enter Title" />
      <input class="input" v-model="description" type="text" name="description" placeholder="Enter Description" />
      <select v-model="category" class="select">
        <option disabled value="">Please select a category</option>
        <option v-for="(category) in categories" :key="category._id">
          {{ category.name }}
        </option>
      </select>
      <button class="submit-button" type="submit">Add Todo</button>
    </form>
    <div class="todo-container">
      <ul>
        <li v-for="(todo, i) in todos" :key="todo._id" class="todo-item">
          <div class="todo">
            <span class="todo-name">{{ todo.title }}</span>
            <span class="todo-description">{{ todo.description }}</span>
            <span class="todo-category">{{ todo.category }}</span>
          </div>
          <button class="delete-btn" @click="removeTodo(todo, i)">
            <span class="delete-icon">🗑️</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  name: "HomeView",
  data() {
    return {
      todos: [],
      categories: [],
      title: "",
      description: "",
      category: "",
    };
  },
  async mounted() {
    try {
      const todosRes = await axios.get("/todoList/");
      this.todos = todosRes.data;
      const catRes = await axios.get("/categoryList/");
      this.categories = catRes.data;
    } catch (err) {
      console.error("Erreur lors du chargement :", err);
    }
  },
  methods: {
    async addTodo() {
      if (!this.title || !this.description || !this.category) return;
      try {
        const res = await axios.post("/todoList/", {
          title: this.title,
          description: this.description,
          category: this.category,
        });
        this.todos.push(res.data);
        this.title = "";
        this.description = "";
        this.category = "";
      } catch (err) {
        console.error("Erreur lors de l'ajout :", err);
      }
    },
    async removeTodo(todo, i) {
      try {
        await axios.delete("/todoList/" + todo._id);
        this.todos.splice(i, 1);
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
      }
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

body {
  background: linear-gradient(90deg, #66a6ff 0%, #89f7fe 100%);
  font-family: 'Montserrat', sans-serif;
}

.main {
  margin: 3rem auto;
  max-width: 450px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  padding: 2.5rem 2rem 2rem 2rem;
}

h3 {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: #1976d2;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 2.2rem;
  margin-right: 0.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
  margin-bottom: 2rem;
}

.input, .select {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d1d9e6;
  border-radius: 8px;
  font-size: 1rem;
  background: #f7faff;
  transition: border 0.2s;
}

.input:focus, .select:focus {
  border: 1.5px solid #1976d2;
  outline: none;
  background: #e3f0ff;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(90deg, #1976d2 60%, #42a5f5 100%);
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
  transition: background 0.2s;
}

.submit-button:hover {
  background: linear-gradient(90deg, #1565c0 60%, #1976d2 100%);
}

.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-container ul {
  width: 100%;
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 18px 10px;
  margin-bottom: 12px;
  background: #f7faff;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(25, 118, 210, 0.06);
  transition: box-shadow 0.2s;
}

.todo-item:hover {
  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.13);
}

.todo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 250px;
  gap: 2px;
}

.todo-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1976d2;
}

.todo-description {
  font-size: 0.98rem;
  color: #333;
  margin-top: 2px;
  margin-bottom: 2px;
  opacity: 0.85;
}

.todo-category {
  font-size: 0.92rem;
  color: #42a5f5;
  background: #e3f0ff;
  border-radius: 5px;
  padding: 2px 8px;
  margin-top: 2px;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background 0.2s;
}

.delete-btn:hover {
  background: #ffeaea;
}

.delete-icon {
  font-size: 1.3rem;
  color: #f44336;
}
</style>