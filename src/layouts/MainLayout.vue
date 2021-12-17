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
          <img :src="'localhost:5000/src/' + image.img" @click="image.checked = !image.checked" class="image"/>
          <div class="keyframe-image-control">
            <div>Séléctionnée : <q-icon v-show="!image.checked" name="close" class="text-red" style="font-size: 3em;" /><q-icon v-show="image.checked" name="check" class="text-teal" style="font-size: 3em;" /></div>
            <q-btn color="primary" label="Montrer la frame" @click="seekValue = image.time_code" />
          </div>
          <br>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view :images="images" :seekValue="seekValue" @keyframeData="getKeyframeData" />
    </q-page-container>

  </q-layout>
</template>

<style>
  .keyframe-image {
    padding: 5px;
    margin-top: 5px;
    border-bottom: 1px solid black;
  }

  .keyframe-image .image {
    transition: 150ms;
  }

  .keyframe-image .image:hover {
    opacity: 0.8;
    transition: 150ms;
    cursor: pointer;
  }

  .keyframe-image-control {
    display: flex;
    flex-direction: row;
    justify-content: space-between
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
      data: null,
      seekValue: null,
      images: []
    }
  },
  methods: {
    getKeyframeData (data) {
      this.data = JSON.stringify(data)
      this.data = JSON.parse(this.data)
      for (let i = 0; i < 12; i++) {
        this.images.push(this.data.data[i])
      }
      // this.images = this.data.data
      // console.log(this.data.data)
    }
  }
}
</script>
