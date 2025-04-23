<!-- filepath: c:\Users\richa\programacion\front_prueba\src\views\Crud.vue -->
<template>
    <div>
      <h1>CRUD</h1>
      <form @submit.prevent="createItem">
        <input v-model="newItem" type="text" placeholder="New Item" required />
        <button type="submit">Add</button>
      </form>
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.name }}
          <button @click="deleteItem(item.id)">Delete</button>
          <button @click="editItem(item)">Edit</button>
        </li>
      </ul>
      <div v-if="editingItem">
        <h2>Edit Item</h2>
        <form @submit.prevent="updateItem">
          <input v-model="editingItem.name" type="text" required />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        items: [],
        newItem: '',
        editingItem: null,
      };
    },
    methods: {
      async fetchItems() {
        try {
          const response = await axios.get('http://localhost:3000/items');
          this.items = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async createItem() {
        try {
          const response = await axios.post('http://localhost:3000/items', {
            name: this.newItem,
          });
          this.items.push(response.data);
          this.newItem = '';
        } catch (error) {
          console.error(error);
        }
      },
      async deleteItem(id) {
        try {
          await axios.delete(`http://localhost:3000/items/${id}`);
          this.items = this.items.filter(item => item.id !== id);
        } catch (error) {
          console.error(error);
        }
      },
      editItem(item) {
        this.editingItem = { ...item };
      },
      async updateItem() {
        try {
          const response = await axios.put(`http://localhost:3000/items/${this.editingItem.id}`, this.editingItem);
          const index = this.items.findIndex(item => item.id === this.editingItem.id);
          this.items[index] = response.data;
          this.editingItem = null;
        } catch (error) {
          console.error(error);
        }
      },
    },
    mounted() {
      this.fetchItems();
    },
  };
  </script>