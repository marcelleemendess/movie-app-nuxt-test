<template>
  <div>
    <Loading v-if="$fetchState.pending" class="d-flex justify-content-center align-items-center" style="height: 100vh;" />
    <div v-else>
      <div class="container py-4">
        <div class="row">
          <div class="col-md-4">
            <img class="card-img-top img-fluid" :src="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`" alt="" style="max-height: 100%;">
          </div>
          <div class="col-md-8">
            <div id="movie-content">
              <h1>{{ movie.title }}</h1>
              <p>
                <span class="font-weight-bold">Slogan:</span> {{ movie.tagline }}
              </p>
              <p>
                <span class="font-weight-bold">Duração:</span> {{ movie.runtime }} minutos
              </p>
              <p>
                <span class="font-weight-bold">Resumo:</span> {{ movie.overview }}
              </p>
              <NuxtLink class="btn btn-primary btn-sm mt-2" :to="{ name: 'index' }">Voltar</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



 <script>
 import axios from 'axios';

 export default {
   name: 'SingleMovie',
   data() {
     return {
       movie: null,
     };
   },
   async fetch() {
     await this.getSingleMovie();
   },

   fetchDelay:1000,
   methods: {
     async getSingleMovie() {
       try {
        const movieId = this.$route.params.slug;
         const response = await axios.get(
           `https://api.themoviedb.org/3/movie/${movieId}?api_key=67ec29b07a7c15d793e07b29edc0f805`
         );
         this.movie = response.data;
       } catch (error) {
         console.error(error);
       }
     },
   },
 };
 </script>





