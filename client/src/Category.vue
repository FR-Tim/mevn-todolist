<template>
  <div class="main">
    <h3>📝 Category List</h3>
    
    <form class="form" @submit.prevent="addCategory">
      <input
        class="input"
        v-model="name"
        type="text"
        name="name"
        placeholder="Enter Category"
      />
      <br />
      <button class="submit-button" type="submit">Add Category</button>
    </form>

    <div class="category-container">
     
      <ul>
        <li v-for="(category, i) in categories" :key="category._id">
          <div class="category">
            <span class="todo-category">{{ category.name }}</span>
          </div>
          <button class="delete-btn" @click="removeCategory(category, i)">🗑️</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  name: "CategoryView",
  data() {
    return {
      categories: [],
      name: "",
    };
  },
  mounted() {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          console.log("Pas de token");
          return;
        }
        const res = await axios.get("/categoryList/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Réponse brute API :", res);
        console.log("Contenu data reçu :", res.data);
        this.categories = res.data;
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    },
    async addCategory() {
      if (!this.name.trim()) return;
      try {
        const token = localStorage.getItem('jwt');
        const res = await axios.post(
          "/categoryList/",
          { name: this.name },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        this.name = "";
        if (res.data && res.data._id) {
          this.categories.push(res.data);
        } else {
          await this.loadCategories();
        }
      } catch (err) {
        console.error("Erreur lors de l'ajout :", err);
      }
    },
    async removeCategory(item, i) {
      try {
        await axios.delete("/categoryList/" + item._id);
        this.categories.splice(i, 1);
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loadCategories();
    });
  }
};
</script>

<style>
/* Ton style inchangé, je ne modifie pas */
.main {
  margin: auto;
  margin-top: 3rem;
  max-width: 420px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(25, 118, 210, 0.15);
  padding: 2rem 2rem 1.5rem 2rem;
}

h3 {
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  color: #1976d2;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #1976d2;
  font-size: 16px;
  margin-bottom: 1rem;
  transition: border 0.2s;
}

.input:focus {
  outline: none;
  border: 2px solid #1565c0;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(90deg, #1976d2 0%, #42a5f5 100%);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.10);
  transition: background 0.2s;
}

.submit-button:hover {
  background: linear-gradient(90deg, #1565c0 0%, #1976d2 100%);
}

.category-container {
  margin-top: 1.5rem;
}

.category-container ul {
  width: 100%;
  list-style: none;
  padding: 0;
}

.category-container ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #e3eafc;
  transition: background 0.2s;
}

.category-container ul li:hover {
  background: #f5faff;
}

.category {
  display: flex;
  align-items: center;
}

.todo-category {
  font-size: 18px;
  font-weight: 500;
  color: #1976d2;
  letter-spacing: 0.5px;
  padding-left: 8px;
}

.delete-btn {
  background: linear-gradient(90deg, #f44336 0%, #ff7961 100%);
  color: white;
  padding: 10px 18px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1.3rem;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.10);
  transition: background 0.2s;
}

.delete-btn:hover {
  background: linear-gradient(90deg, #d32f2f 0%, #f44336 100%);
}
</style>
