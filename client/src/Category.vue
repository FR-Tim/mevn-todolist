<template>
    
    <div class="main">
     <h3>Category List</h3>
   
     <form class="form" >
       <input class="input" v-model="name" type="text" name="name" placeholder="Enter Category" />
       <br />
       <button class="submit-button" @click="addCategory">Add Category</button>
     </form>
     <div class="category-container">
       <ul>
         <li v-for="(category, i) in categories" :key="category._id">
           <div class="category">
           <span class="todo-category">{{ category.name }}</span>
         </div>
           <button class="delete-btn" @click="removeCategory(category, i)">DELETE CATEGORY</button>
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
        categories: [],
        name: "",
      };
    },
    async mounted() {
      const response = await axios.get("api/categoryList/");
      this.categories = response.data;
    },
    methods: {
      async addCategory(e) {
        e.preventDefault();
        const response = await axios.post("api/categoryList/", {
            name: this.name
        });
        this.categories.push(response.data);
        this.name = "";
  
        
        for (let index = 0; index < this.categories.length; index++) {
          const element = this.categories[index];
          console.log('Category: ' + element.name);
        }
  
      },
      async removeCategory(item, i) {
        await axios.delete("api/categoryList/" + item._id);
        this.categories.splice(i, 1);
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