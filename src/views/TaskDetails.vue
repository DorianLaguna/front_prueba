<template>
  <div>
    <h1>{{ task.title }}</h1>
    <p>{{ task.description }}</p>
    <p>Status: {{ task.status }}</p>
    <router-link :to="`/tasks/${task.id}/edit`">Edit</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import { fetchTaskById } from '@/api/tasks';

export default {
  data() {
    return {
      task: {},
    };
  },
  async mounted() {
    try {
      const response = await fetchTaskById(this.$route.params.id);
      this.task = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
