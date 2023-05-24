<template>
  <div class="card-deck">
    <div class="card bg-transparent border-0 shadow">
      <img
        class="card-img-top img-fluid img-small"
        :src="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`"
        alt=""
      >
      <div class="card-body d-flex flex-column">
        <h4 class="card-title small font-weight-bold mb-2">{{ movie.title.slice(0, 25) }}<span v-if="movie.title.length > 5">...</span></h4>

        <p class="card-text small mb-2">{{ movie.overview.slice(0, 50) }}<span v-if="movie.overview.length > 50">...</span></p>
         <Rating :grade="0" :maxStars="5" :hasCounter="true"/>
        <div class="mt-auto">
          <NuxtLink class="btn btn-primary btn-sm mr-2" :to="{ name: 'movies-slug', params:{ slug: movie.id} }">Sobre o filme</NuxtLink>

          <button class="btn btn-link btn-lg border-0" @click="toggleFavorite(movie.id)">
            <i :class="isFavorite(movie.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart text-danger'"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


 <script>
 import Rating from './Rating.vue'

 export default {
   name: 'Card',
   components: {
    Rating
   },
   props: {
    movie: {
      type: Object,
      required: true,
    },
    toggleFavorite: {
      type: Function,
      required: true,
    },
    isFavorite: {
      type: Function,
      required: true,
    },

  },
}
 </script>

<style scoped>
.card {
  transition: transform 0.3s;
}
.card:hover {
  transform: scale(1.05);
}

</style>
