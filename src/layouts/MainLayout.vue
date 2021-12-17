<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Analyseur Video
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" :width="500" bordered>
      <div v-for='image in images' :key="image.id">
        <div class="keyframe-image col-4">
          <q-img :src="image.src" @click="image.checked = !image.checked" /> <!-- , $emit('update:selected-image', image) -->
          <div>Séléctionnée : <q-icon v-show="!image.checked" name="close" class="text-red" style="font-size: 3em;" /><q-icon v-show="image.checked" name="check" class="text-teal" style="font-size: 3em;" /></div>
          <br>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view :images="images" />
    </q-page-container>

  </q-layout>
</template>

<style>
  .keyframe-image {
    padding: 5px;
    margin-top: 5px;
    border-bottom: 1px solid black;
  }
</style>

<script>
import { ref } from 'vue'

export default {
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
      images: [
        {
          id: 1,
          src: '/keyframes/149.jpg',
          checked: true,
          timecode: 4.95
        },
        {
          id: 2,
          src: '/keyframes/281.jpg',
          checked: true,
          timecode: 9.36
        },
        {
          id: 3,
          src: '/keyframes/331.jpg',
          checked: true,
          timecode: 11.03
        },
        {
          id: 4,
          src: '/keyframes/389.jpg',
          checked: true,
          timecode: 12.95
        },
        {
          id: 5,
          src: '/keyframes/627.jpg',
          checked: true,
          timecode: 20.9
        },
        {
          id: 6,
          src: '/keyframes/1011.jpg',
          checked: true,
          timecode: 33.7
        }
      ]
    }
  }
}
</script>
