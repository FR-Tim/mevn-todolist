<template>
  
    <div class="main">
     <h3>Todo List</h3>
   
     <form class="form" > 
       <input class="input" v-model="title" type="text" name="name" placeholder="Enter Title" />
       <br />
       <input class="input" v-model="description" type="text" name="description"  placeholder="Enter Description" />
       <br />
       <select v-model="category">
          <option disabled value="">Please select a category</option>
          <option v-for="(category) in categories" :key="category._id">
            {{ category.name }}
          </option>
        </select>
       <br />
       <button class="submit-button" @click="addTodo">Add Todo</button>
     </form>
     <div class="todo-container">
       <ul>
         <li v-for="(todo, i) in todos" :key="todo._id">
           <div class="todo">
           <span class="todo-name">{{ todo.title }}</span>
           <span class="todo-description">{{ todo.description }}</span>
           <span class="todo-categorie">{{ todo.category }}</span>
         </div>
           <button class="delete-btn" @click="removeTodo(todo, i)">DELETE TODO</button>
         </li>
       </ul>
     </div>
     </div>
   </template>
  
  
  
  <script>
  
  
  import axios from "axios";
  
  export default {
    name: "App",
    data() {
      return {
        todos: [],
        categories: [],
        description: "",
        title: "",
        category: "",
      };
    },
    async mounted() {
      let response = await axios.get("api/todoList/");
      this.todos = response.data;
      response = await axios.get("api/categoryList/");
      this.categories = response.data;
    },
    methods: {
      async addTodo(e) {
        e.preventDefault();
        const response = await axios.post("api/todoList/", {
          title: this.title,
          description: this.description,
          category: this.category
        });
        this.todos.push(response.data);
        this.title = "";
        this.description = "";
        this.category = "";
  
        
        for (let index = 0; index < this.todos.length; index++) {
          const element = this.todos[index];
          console.log('Todo: ' + element.title);
        }
  
      },
      async removeTodo(item, i) {
        await axios.delete("api/todoList/" + item._id);
        this.todos.splice(i, 1);
      },
    }
  };
  </script>
  
  <style>
  .main {
    margin: auto;
    margin-top: 3rem;
    max-width: 400px;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
   h3{
    font-size: 22px;
    font-weight: bold;
    text-align: center;
  }
  
  .input {
    width: 100%;
    padding: 10px;
  }
  
  .submit-button {
    width: 400px;
    padding: 10px;
    background-color: #1976d2;
    color: white;
    cursor: pointer;
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
  
  .todo-container ul li {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .todo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 10px;
    max-width: 250px;
  }
  
  .todo-name {
    font-size: 18px;
    font-weight: bold;
  }
  
  .todo-description {
    max-width: 70%;
    font-size: 14px;
  }
  
  .delete-btn {
    background-color: #f44336;
    color: white;
    padding: 10px;
    cursor: pointer;
    border: none;
  }
  </style>