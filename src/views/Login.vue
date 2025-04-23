<template>
  <div class="container login-container">
    <div class="login-card">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p class="register-link">
        Don't have an account? <router-link to="/register">Register here</router-link>.
      </p>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await login({
          email: this.email,
          password: this.password,
        });
        const { token, message } = response.data;

        // Store the token in localStorage
        localStorage.setItem('authToken', token);

        this.successMessage = message;
        this.errorMessage = '';
        console.log('Token stored:', token);

        // Redirect to tasks after login
        this.$router.push('/tasks');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorMessage = 'Invalid credentials. Please try again.';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
        this.successMessage = '';
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.login-card h1 {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #333;
}

.login-card form {
  display: flex;
  flex-direction: column;
}

.login-card input {
  margin-bottom: 1rem;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.login-card button {
  padding: 0.8rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.login-card button:hover {
  background-color: #0056b3;
}

.success {
  color: green;
  margin-top: 1rem;
}

.error {
  color: red;
  margin-top: 1rem;
}

.register-link {
  margin-top: 1rem;
  font-size: 0.9rem;
}
</style>