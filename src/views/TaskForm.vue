<template>
  <div class="task-form-container">
    <div class="task-form-card">
      <h1>{{ isEditing ? 'Edit Task' : 'New Task' }}</h1>
      <form @submit.prevent="submitForm">
        <input v-model="task.title" type="text" placeholder="Title" />
        <textarea v-model="task.description" placeholder="Description"></textarea>
        <select v-model="task.status">
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <div class="form-actions">
          <button type="submit" class="save-button">{{ isEditing ? 'Update' : 'Create' }}</button>
          <router-link to="/tasks" class="cancel-button">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { fetchTaskById, createTask, updateTask } from '@/api/tasks';

export default {
  data() {
    return {
      task: {
        title: '',
        description: '',
        status: 'pending',
      },
    };
  },
  computed: {
    isEditing() {
      return !!this.$route.params.id;
    },
  },
  async mounted() {
    if (this.isEditing) {
      try {
        const response = await fetchTaskById(this.$route.params.id);
        this.task = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  },
  methods: {
    async submitForm() {
      try {
        if (this.isEditing) {
          await updateTask(this.$route.params.id, this.task);
        } else {
          await createTask(this.task);
        }
        this.$router.push('/tasks');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.task-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.task-form-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.task-form-card h1 {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #333;
  text-align: center;
}

.task-form-card form {
  display: flex;
  flex-direction: column;
}

.task-form-card input,
.task-form-card textarea,
.task-form-card select {
  margin-bottom: 1rem;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.task-form-card textarea {
  resize: none;
  height: 100px;
}

.form-actions {
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
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #c82333;
}
</style>
