<template>
  <div>
    <!-- Movies -->
    <div class="container mt-4">
      <div class="row">
        <div id="movie-grid" class="col-md-3 col-sm-6 mb-4" v-for="(movie, index) in movies" :key="index">
          <Card
            :movie="movie"
            :toggleFavorite="toggleFavorite"
            :isFavorite="isFavorite"
          />
        </div>
      </div>
    </div>
  </div>
</template>

 <script>
 import axios from 'axios';
 import 'bootstrap-icons/font/bootstrap-icons.css'
 import Card from '@/components/Card.vue'

 export default {
  components: {
   Card
  },
   name: 'Home',
   data(){
    return {
      movies: [],
    }
   },
   async created() {
      await this.getMovies()
    },
   methods: {
    async getMovies() {
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=67ec29b07a7c15d793e07b29edc0f805');
      const result = response.data;

      result.results.forEach((movie) => {
        this.movies.push(movie);
      });
    },
    isFavorite(movieId) {
      if (process.client) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites.includes(movieId);
      }
      return false;
   },
   toggleFavorite(movieId) {
    if (process.client) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.indexOf(movieId);

        if (index > -1) {
          favorites.splice(index, 1);
        } else {
          favorites.push(movieId);
        }
      localStorage.setItem('favorites', JSON.stringify(favorites));

      // Atualizar a propriedade movies com os favoritos atualizados
    this.movies = this.movies.map(movie => {
      if (movie.id === movieId) {
        return {
          ...movie,
          favorite: !movie.favorite
        };
      }
      return movie;
    });
    }
   },
  },
 }
 </script>


