<template>
  <div class="container">
    <div class="row justify-content-center align-items-center vh-100">
      <main class="form-signin w-50 bg-light shadow p-4">
        <form @submit.prevent="login" class="p-4">
          <h1 class="h3 mb-3 fw-normal">Login</h1>

          <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>

          <input v-model="auth.email" type="email" class="form-control mb-3" placeholder="Email" required>
          <input v-model="auth.password" type="password" class="form-control mb-3" placeholder="Password" required>
          <button class="w-100 btn btn-lg btn-primary" type="submit">Login</button>

          <div class="form-group row align-items-center mt-3">
            <div class="col-auto">
              <NuxtLink to="/forgetPassword" class="btn btn-link" type="button">Esqueci a senha</NuxtLink>
            </div>
            <div class="col-auto">
              <NuxtLink to="/register" class="btn btn-link" type="button">Registrar</NuxtLink>
            </div>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>



<script>
export default {
  name: 'Login',
  data(){
    return {
      auth: {
        email:'',
        password:''
      },
      errorMessage: '',
    }
  },
  methods: {
  async login() {
    try {
      await this.$fire.auth.signInWithEmailAndPassword(this.auth.email, this.auth.password);

      this.$router.push('/');
    } catch (error) {
      console.error(error);
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          this.errorMessage = 'Credenciais inválidas. Tente novamente.';
        } else {
          this.errorMessage = 'Erro ao efetuar o login. Tente novamente.';
        }

        setTimeout(this.clearErrorMessage, 4000)
        this.auth.password = '';
    }
  },
  },
  created() {
    // Check if the user is already authenticated
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.$store.commit('SET_USER', user);
      this.$router.push('/');
    }
  },
}
</script>


