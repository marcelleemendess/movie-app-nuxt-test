<template>
  <div>
    <div class="d-flex align-items-center">
      <button
        @click="rate(star)"
        v-for="star in maxStars"
        :class="['btn', 'btn-link', 'p-0', 'mr-1', { 'active': star <= stars }]"
        :key="star"
      >
        <i :class="star <= stars ? 'bi bi-star-fill text-warning' : 'bi bi-star text-warning'"></i>
      </button>
      <div v-if="hasCounter" class="ml-2">
        <p class="mb-0" style="font-size: 12px;">
          Rating: <span>{{ stars }}</span>/<span>{{ maxStars }}</span>
        </p>
      </div>
    </div>
  </div>
</template>


 <script>
 export default {
   name: 'Rating',
   props: ['grade', 'maxStars', 'hasCounter'],
  data() {
    return {
      stars: this.grade
    }
  },
  methods: {
    rate(star) {
        if (typeof star === 'number' && star <= this.maxStars && star >= 0) {
          this.stars = this.stars === star ? star - 1 : star

          // Save the rating in localStorage
        localStorage.setItem('rating', this.stars.toString());
        }
      }
    },
 }
 </script>
