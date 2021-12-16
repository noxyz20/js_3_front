<template>
  <q-page class="flex flex-center bg-secondary">

    <!-- <q-uploader
        url="http://localhost:4444/upload"
        color="primary"
        flat
        bordered
        style="max-width: 300px"
      /> -->

      {{ selectedImages }}

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PageIndex',
  setup () {
    const $store = useStore()

    return {
    }
  },
  computed: {
    selectedImages () {
      return this.$store.getters.getSelectedImages
    }
  },
  updated () {
    console.log(this.selectedImages)
  }
})
</script>
