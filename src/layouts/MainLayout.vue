<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Analyseur Video
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer :width="350" show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <drawer/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import drawer from 'src/components/drawer.vue'

export default {
  components: { drawer },
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  data () {
    return {
      selectedImages: []
    }
  },
  methods: {
  }
}
</script>
