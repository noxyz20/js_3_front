<template>
  <q-page class="flex systemPage">
    <div class="toggleGroup">
      <q-toggle v-model="enableVideoPlayer" label="Player video" color="accent"/>
      <q-toggle v-model="enableCarousel" label="Previsualisation des keyframes" color="info"/>
    </div>
    <div class="player">
      <Artplayer @get-instance="getInstance" :option="playerOptions" :style="playerStyle" v-show="enableVideoPlayer" />
    </div>
    <div class="carousel" v-show="enableCarousel">
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
  props: ['images'],
  setup () {
    return {
      slide: ref(1)
    }
  },
  data () {
    return {
      enableVideoPlayer: true,
      enableCarousel: true,
      playerOptions: {
        url: '/output.mp4',
        screenshot: true,
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
      // console.log(art)
    },
    updateHighlight () {
      this.playerOptions.highlight = this.highlightData
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
