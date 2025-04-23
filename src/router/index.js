import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Crud from '../views/Crud.vue';
import TaskList from '../views/TaskList.vue';
import TaskDetails from '../views/TaskDetails.vue';
import TaskForm from '../views/TaskForm.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/crud', name: 'Crud', component: Crud },
  { path: '/tasks', name: 'TaskList', component: TaskList },
  { path: '/tasks/:id', name: 'TaskDetails', component: TaskDetails },
  { path: '/tasks/new', name: 'TaskForm', component: TaskForm },
  { path: '/tasks/:id/edit', name: 'TaskEdit', component: TaskForm },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
