<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <ul class="navbar-nav">
      <li class="nav-item">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
      </li>
      <li class="nav-item">
        <button @click="signOut" class="btn btn-link nav-link">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
    signOut: {
      type: Function,
      required: true,
    },
  },
}
</script>

<style scoped>
</style>

