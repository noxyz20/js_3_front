<template>
  <modal-upload/>
</template>

<script>
import { defineComponent } from 'vue'
import ModalUpload from '../components/ModalUpload.vue'
export default defineComponent({
  name: 'PageIndex',
  components: {
    ModalUpload
  }
})
</script>
