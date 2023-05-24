<template>
  <div>
    <client-only>
      <Navbar
        v-if="isAuthenticated"
        :signOut="signOut"
      />
      <Nuxt />
    </client-only>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import { mapGetters } from 'vuex';

export default {
  components: { Navbar },
  name: 'Layout',
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    async signOut() {
      try {
        await this.$fire.auth.signOut();
        console.log('User signed out');
        this.$router.push('/login');
      } catch (error) {
        console.error('Sign out error:', error);
      }
    },
  },
};
</script>

<style scoped>
</style>



