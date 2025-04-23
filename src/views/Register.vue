<template>
  <div class="container register-container">
    <div class="register-card">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <div class="form-group">
          <input v-model="name" type="text" placeholder="Name" />
          <p v-if="errors.name" class="error">{{ errors.name[0] }}</p>
        </div>
        <div class="form-group">
          <input v-model="email" type="email" placeholder="Email" />
          <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
        </div>
        <div class="form-group">
          <input v-model="password" type="password" placeholder="Password" />
          <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>
        </div>
        <button type="submit">Register</button>
      </form>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p class="login-link">
        Already have an account? <router-link to="/login">Login here</router-link>.
      </p>
    </div>
  </div>
</template>

<script>
import { register } from '@/api/auth';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errorMessage: '',
      successMessage: '',
      errors: {}, // Object to store validation errors
    };
  },
  methods: {
    async register() {
      try {
        const response = await register({
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.successMessage = 'Registration successful!';
        this.errorMessage = '';
        this.errors = {}; // Clear errors on success
        console.log(response.data);
        this.$router.push('/login'); // Redirect to login after successful registration
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors; // Set validation errors
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
        this.successMessage = '';
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.register-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.register-card h1 {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #333;
}

.register-card form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

.register-card input {
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
}

.register-card button {
  padding: 0.8rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.register-card button:hover {
  background-color: #218838;
}

.success {
  color: green;
  margin-top: 1rem;
}

.error {
  color: red;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  text-align: left;
}

.login-link {
  margin-top: 1rem;
  font-size: 0.9rem;
}
</style>