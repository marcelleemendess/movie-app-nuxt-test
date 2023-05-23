<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <ul class="navbar-nav">
      <li class="nav-item">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
      </li>
      <li class="nav-item">
        <button  @click="signOut" class=" btn btn-link nav-link">Logout</button>
      </li>
    </ul>
  </nav>
</template>

 <script>
 export default {
   name: 'Navbar',
  asyncData() {
    $nuxt.$fire.auth.signOut();
  },
  methods: {
  async signOut() {
    try {
      await this.$fire.auth.signOut();
      console.log('User signed out');
      this.$router.push('/login')
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }
}
 }
 </script>

<style scoped>
</style>
