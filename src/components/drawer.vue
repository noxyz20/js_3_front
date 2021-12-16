<template>
  <div v-for='image in images' :key="image.id">
    <div class="keyframe-image col-4">
      <q-img :src="image.src" @click="image.checked = !image.checked" /> <!-- , $emit('update:selected-image', image) -->
      <div>Checked : {{ image.checked ? 'Oui' : 'Non'}}</div>
    </div>
  </div>
</template>

<style>
  .keyframe-image {
    margin: 10px;
 }
</style>

<script>
export default {
  name: 'drawer',
  setup () {
    return {}
  },
  data () {
    return {
      images: [
        {
          id: 1,
          src: 'https://placeimg.com/500/300/nature',
          checked: false
        },
        {
          id: 2,
          src: 'https://placeimg.com/500/300/nature',
          checked: false
        },
        {
          id: 3,
          src: 'https://placeimg.com/500/300/nature',
          checked: false
        },
        {
          id: 4,
          src: 'https://placeimg.com/500/300/nature',
          checked: false
        },
        {
          id: 5,
          src: 'https://placeimg.com/500/300/nature',
          checked: false
        },
        {
          id: 6,
          src: 'https://placeimg.com/500/300/nature',
          checked: false
        }
      ]
    }
  }
}
</script>
