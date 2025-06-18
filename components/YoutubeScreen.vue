<template>
  <div
    ref="playerEl"
    class="plyr__video-embed"
    :data-plyr-provider="'youtube'"
    :data-plyr-embed-id="videoId"
  ></div>
</template>

<script setup>
import 'plyr/dist/plyr.css'
import Plyr from 'plyr'

defineProps({
  videoId: {
    type: String,
    required: true
  }
})

const playerEl = ref(null)
let plyrInstance = null

onMounted(() => {
  plyrInstance = new Plyr(playerEl.value, {
    type: 'video',
    controls: ['play-large', 'play', 'progress', 'mute', 'volume', 'fullscreen', 'settings'],
    youtube: {
      noCookie: true, // 使用 youtube-nocookie.com
      rel: 0 // 不顯示相關影片
    }
  })
})

onBeforeUnmount(() => {
  if (plyrInstance) {
    plyrInstance.destroy()
  }
})
</script>

<style scoped></style>
