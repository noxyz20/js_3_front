<template>
  <q-page class="flex flex-center">
    <div class="carousel">
      <q-carousel
        animated
        v-model="slide"
        arrows
        navigation
        infinite
      >
        <q-carousel-slide v-for="image in imagesSelection" v-bind:key="image.id" :name="image.id" :img-src="image.src" />
      </q-carousel>
    </div>
  </q-page>

</template>

<style>
  .carousel {
    width: 80%;
    height: 100%;
  }
</style>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PageIndex',
  props: ['images'],
  setup () {
    return {
      slide: ref(1)
    }
  },
  data () {
  },
  updated () {
    console.log(this.images)
  },
  computed: {
    imagesSelection () {
      return this.images.filter(image => image.checked)
    }
  }
})
</script>
