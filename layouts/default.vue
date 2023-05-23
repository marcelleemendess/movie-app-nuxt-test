  <template>
    <client-only>
      <div>
        <Navbar v-if="isAuthenticated" />
        <Nuxt />
      </div>
  </client-only>
  </template>

<script>
import Navbar from '../components/Navbar.vue';
import { mapGetters } from 'vuex';

  export default {
  components: { Navbar },
  name: 'Layout',
  computed: {
    ...mapGetters(['isAuthenticated'])
  }
};
</script>


