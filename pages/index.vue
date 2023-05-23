<template>
  <div>
    <!-- Movies -->
    <div class="container mt-4">
      <div class="row">
        <div id="movie-grid" class="col-md-3 col-sm-6 mb-4" v-for="(movie, index) in movies" :key="index">
          <div class="card bg-transparent border-0">
            <img class="card-img-top img-fluid" :src="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`" alt="">
            <div class="card-body p-2">
              <h5 class="card-title small font-weight-bold mb-0">{{ movie.title.slice(0, 25) }}<span v-if="movie.title.length > 5">...</span></h5>

              <NuxtLink
                class="btn btn-primary btn-sm mt-2"
                :to="{ name: 'movies-slug', params:{ slug: movie.id} }"
                >
                Sobre o filme
              </NuxtLink>

                <button class="btn btn-primary btn-sm mt-2 ml-auto" @click="toggleFavorite(movie.id)">
                  <i :class="isFavorite(movie.id) ? 'bi bi-star-fill text-warning' : 'bi bi-star text-warning'"></i>
                </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

 <script>
 import axios from 'axios';
 import 'bootstrap-icons/font/bootstrap-icons.css'

 export default {
   name: 'Home',

   data(){
    return {
      movies: [],
      ratings: {},
    }
   },
   async fetch() {
      await this.getMovies()
    },
   methods: {
    async getMovies(){
      const data = axios.get('https://api.themoviedb.org/3/movie/popular?api_key=67ec29b07a7c15d793e07b29edc0f805')
      const result = await data

      result.data.results.forEach((movie) => {
        this.movies.push(movie)
      })

      const storedRatings = JSON.parse(localStorage.getItem('ratings')) || {};
      this.ratings = { ...storedRatings };

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
  }
 }
 </script>

 <style>
 .card {
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

.movie-rating {
  font-size: 12px;
  color: #888;
}

</style>
