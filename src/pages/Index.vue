<template>

  <q-page class="flex flex-center bg-secondary" v-show="!isUpload">

    <q-uploader
        url="http://localhost:5000/upload"
        color="primary"
        flat
        @uploaded="postUpload"
        bordered
        style="max-width: 300px"
      />

  </q-page>

  <q-page class="flex systemPage" v-show="isUpload">
    <div class="toggleGroup">
      <q-toggle v-model="enableVideoPlayer" label="Player video" color="accent"/>
      <q-toggle v-model="enableCarousel" label="Previsualisation des keyframes" color="info"/>
      <br>
      <q-btn color="positive" label="Valider la séléction" @click="postKeyFrameSelected" />
    </div>
    <div class="player">
      <h3>Video Upload :</h3>
      <Artplayer @get-instance="getInstance" :option="playerOptions" :style="playerStyle" v-show="enableVideoPlayer" />
      <q-btn color="primary" label="Ajouter cette keyFrame" @click="getKeyFrame" />
    </div>
    <div class="carousel" v-show="enableCarousel">
      <h3>KeyFrame Séléctionnées : </h3>
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

  .systemPage {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }

  .toggleGroup {
    width: 80%;
    height: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 5px;
  }

  .player {
    width: 80%;
    height: 100%;
    margin-top: 20px;
  }

  .carousel {
    width: 80%;
    height: 100%;
    margin-top: 20px;
  }
</style>

<script>
import { ref } from 'vue'
import Artplayer from 'artplayer/examples/vue/Artplayer'

export default {
  name: 'PageIndex',
  props: ['images', 'seekValue'],
  emits: ['keyframeData'],
  setup () {
    return {
      slide: ref(1)
    }
  },
  data () {
    return {
      isUpload: false,
      uploadData: null,
      player: null,
      enableVideoPlayer: true,
      enableCarousel: true,
      playerOptions: {
        url: '/output.mp4',
        highlight: []
      },
      playerStyle: {
        width: 'auto',
        height: '500px',
        margin: '60px auto 0'
      }
    }
  },
  components: {
    Artplayer
  },
  methods: {
    getInstance (art) {
      this.player = art
    },
    seekTo (tc) {
      this.player.seek = tc
    },
    postUpload (event) {
      if (event.xhr.status === 200) {
        this.isUpload = true
        this.uploadData = event.xhr.response
        console.log(event)
        this.$emit('keyframeData', JSON.parse(event.xhr.response))
      }
    },
    updateHighlight () {
      this.playerOptions.highlight = this.highlightData
    },
    async getKeyFrame () {
      const url = 'http://127.0.0.1:5000/getkeyframe/' + this.player.currentTime
      console.log(url)
      await this.$axios.get()
        .then((response) => {
          console.log(response)
        })
    },
    async postKeyFrameSelected () {
      const valueToSend = {
        keyframes: []
      }
      this.imagesSelection.forEach(image => {
        valueToSend.keyframes.push(image.id)
      })
      console.log(valueToSend)
    }
  },
  watch: {
    seekValue: function (newVal, oldVal) {
      this.seekTo(newVal)
    }
  },
  computed: {
    imagesSelection () {
      return this.images.filter(image => image.checked)
    },
    highlightData () {
      const res = []
      this.imagesSelection.forEach(image => {
        res.push({
          time: image.timecode,
          text: image.id
        })
      })
      return res
    }
  },
  mounted () {
    console.log(this.highlightData)
    setTimeout(this.updateHighlight, 1000)
  }
}
</script>
