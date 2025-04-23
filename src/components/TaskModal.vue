<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Create Task</h2>
      <form @submit.prevent="createTask">
        <div class="form-group">
          <input v-model="task.title" type="text" placeholder="Title" />
          <p v-if="errors.title" class="error">{{ errors.title[0] }}</p>
        </div>
        <div class="form-group">
          <textarea v-model="task.description" placeholder="Description"></textarea>
          <p v-if="errors.description" class="error">{{ errors.description[0] }}</p>
        </div>
        <div class="form-group">
          <select v-model="task.status">
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <p v-if="errors.status" class="error">{{ errors.status[0] }}</p>
        </div>
        <div class="modal-actions">
          <button type="submit" class="save-button">Save</button>
          <button type="button" @click="$emit('close')" class="cancel-button">Cancel</button>
        </div>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { createTask } from '@/api/tasks';

export default {
  data() {
    return {
      task: {
        title: '',
        description: '',
        status: 'pending',
      },
      errors: {}, // Object to store validation errors
      errorMessage: '', // General error message
    };
  },
  methods: {
    async createTask() {
      try {
        await createTask(this.task);
        this.$emit('task-created');
        this.$emit('close');
        this.errors = {}; // Clear errors on success
        this.errorMessage = '';
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors; // Set validation errors
        } else {
          this.errorMessage = 'An error occurred. Please try again.';
        }
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
}

.modal-content form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

.modal-content input,
.modal-content textarea,
.modal-content select {
  margin-bottom: 0.5rem;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.save-button {
  padding: 0.8rem 1.2rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.save-button:hover {
  background-color: #218838;
}

.cancel-button {
  padding: 0.8rem 1.2rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #c82333;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
}
</style>
