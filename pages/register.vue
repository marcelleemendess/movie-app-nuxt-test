<template>
  <div class="container">
    <div class="row justify-content-center align-items-center vh-100">
      <main class="form-signin w-50 bg-light shadow p-4">
        <form @submit.prevent="register" class="p-4">
          <h1 class="h3 mb-3 fw-normal">Registrar</h1>

          <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>

          <input v-model="auth.email" type="email" class="form-control mb-3" placeholder="Email" required>
          <input v-model="auth.password" type="password" class="form-control mb-3" placeholder="Password" required>
          <button class="w-100 btn btn-lg btn-primary mb-3" type="submit">Register</button>
          <div class="form-group row align-items-center mt-3">
            <div class="col-auto">
              <p class="mb-0">Já tem registro?</p>
            </div>
            <div>
              <button @click="$router.push('/login')" class="btn btn-link" type="button">Login</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Register',
  data() {
    return {
      auth: {
        email: '',
        password: '',
      },
      errorMessage: '', // Initialize error message
    };
  },
  methods: {
    async register() {
      try {
        await this.$store.dispatch('registerUser', {
          email: this.auth.email,
          password: this.auth.password,
        });
        // Registration successful
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
        // Update error message based on the error code
        if (error.code === 'auth/email-already-in-use') {
          this.errorMessage = 'O usuário já possui registro.';
        } else if (error.code === 'auth/weak-password') {
          this.errorMessage = 'Senha deve conter pelo menos 6 characters.';
        } else {
          this.errorMessage = 'Registro negado. Tente novamente.';
        }
        // Clear the password field
        this.auth.password = '';
        // Clear error message after 4 seconds
        setTimeout(this.clearErrorMessage, 4000);
      }
    },
    clearErrorMessage() {
      this.errorMessage = '';
    },
  },
};
</script>


