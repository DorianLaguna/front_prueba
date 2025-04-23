<template>
  <div class="container">
    <h1>Task List</h1>
    <div class="actions">
      <button @click="showModal = true" class="create-task-button">Create Task</button>
      <select v-model="filter" @change="fetchTasks" class="status-filter">
        <option value="">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>

    <div v-if="tasks.length === 0" class="no-tasks">
      <p>No tasks available. Click "Create Task" to add one!</p>
    </div>

    <div v-else class="table-container">
      <table class="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
            <td>{{ formatDate(task.due_date) }}</td>
            <td :class="task.status">{{ task.status }}</td>
            <td>
              <router-link :to="`/tasks/${task.id}/edit`" class="edit-button">Edit</router-link>
              <button @click="deleteTask(task.id)" class="delete-button">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="feedbackMessage" class="feedback-message">{{ feedbackMessage }}</div>
    <TaskModal v-if="showModal" @close="showModal = false" @task-created="handleTaskCreated" />
  </div>
</template>

<script>
import TaskModal from '@/components/TaskModal.vue';
import { fetchTasks, deleteTask } from '@/api/tasks';

export default {
  components: {
    TaskModal,
  },
  data() {
    return {
      tasks: [],
      filter: '',
      showModal: false,
      feedbackMessage: '', // Mensaje de retroalimentación
    };
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await fetchTasks(this.filter);
        this.tasks = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTask(id) {
      if (confirm('Are you sure you want to delete this task?')) {
        try {
          await deleteTask(id);
          this.fetchTasks(); // Refresh the task list after deletion
        } catch (error) {
          console.error(error);
        }
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    handleTaskCreated(message) {
      this.fetchTasks();
      this.showFeedback(message);
    },
    showFeedback(message) {
      this.feedbackMessage = message;
      setTimeout(() => {
        this.feedbackMessage = ''; // Oculta el mensaje después de 3 segundos
      }, 3000);
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.create-task-button {
  padding: 0.8rem 1.2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.create-task-button:hover {
  background-color: #0056b3;
}

.status-filter {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  color: #333;
}

.status-filter:focus {
  outline: none;
  border-color: #007bff;
}

.no-tasks {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #555;
}

.table-container {
  overflow-x: auto;
}

.task-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.task-table th,
.task-table td {
  border: 1px solid #ddd;
  padding: 0.8rem;
  text-align: left;
}

.task-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.task-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.task-table tr:hover {
  background-color: #f1f1f1;
}

.task-table td .edit-button,
.task-table td .delete-button {
  padding: 0.4rem 0.8rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
}

.task-table td .edit-button {
  background-color: #ffc107;
  color: white;
  text-decoration: none;
}

.task-table td .edit-button:hover {
  background-color: #e0a800;
}

.task-table td .delete-button {
  background-color: #dc3545;
  color: white;
}

.task-table td .delete-button:hover {
  background-color: #c82333;
}

.pending {
  color: #ffc107;
  font-weight: bold;
}

.completed {
  color: #28a745;
  font-weight: bold;
}

.feedback-message {
  margin-top: 1rem;
  padding: 0.8rem;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  text-align: center;
}

@media (max-width: 768px) {
  .actions {
    flex-direction: column;
    align-items: stretch;
  }

  .create-task-button {
    margin-bottom: 1rem;
  }

  .status-filter {
    width: 100%;
  }
}

@media (min-width: 1024px) {
  .task-table th,
  .task-table td {
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
  }

  .create-task-button {
    font-size: 1.2rem;
    padding: 1rem 1.5rem;
  }

  .status-filter {
    font-size: 1.1rem;
    padding: 0.8rem;
  }
}
</style>
