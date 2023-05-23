<template>
  <div class="container">
    <div class="row justify-content-center align-items-center vh-100">
      <main class="form-signin w-100 bg-light shadow p-4">
        <form @submit.prevent="resetPassword" class="p-4">
          <h1 class="h3 mb-3 fw-normal">Recuperar Senha</h1>
          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>
          <div v-if="successMessage" class="alert alert-success">
            {{ successMessage }}
          </div>

          <input v-model="auth.email" type="email" class="form-control mb-3" placeholder="Email" required>

          <div class="form-group row mt-3">
            <div class="col">
              <button type="submit" class="btn btn-primary">Enviar Email de Recuperação</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>


<script>
export default {
  name: "ForgetPassword",
  data() {
    return {
      auth: {
        email: '',
      },
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async resetPassword() {
      try {
        await this.$store.dispatch('resetPassword', {
          email: this.auth.email,
        });
        // Password reset email sent successfully
        this.successMessage = 'Um email de redefinição de senha foi enviado para o seu endereço de email.';
        // Clear the email field
        this.auth.email = '';
        this.$router.push('/login');
        // Clear success message after 4 seconds
        setTimeout(this.clearSuccessMessage, 4000);
      } catch (error) {
        console.error(error);
        // Update error message based on the error code
        if (error.code === 'auth/user-not-found') {
          this.errorMessage = 'Nenhum usuário encontrado com esse email.';
        } else {
          this.errorMessage = 'Falha ao enviar o email de redefinição de senha. Tente novamente.';
        }
        // Clear the email field
        this.auth.email = '';
        // Clear error message after 4 seconds
        setTimeout(this.clearErrorMessage, 4000);
      }
    },
    clearErrorMessage() {
      this.errorMessage = '';
    },
    clearSuccessMessage() {
      this.successMessage = '';
    },
  },
};
</script>
