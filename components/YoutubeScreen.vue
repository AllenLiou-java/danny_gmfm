<template>
  <div>
    <template v-if="youtubeVerification(videoUrl)">
      <div class="aspect-video w-full overflow-hidden">
        <iframe
          class="h-full w-full"
          :src="setVide(videoUrl)"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowfullscreen
        ></iframe>
      </div>
    </template>
    <template v-else>
      <p style="color: brown">影片格式網址錯誤，詳情請洽相關人員！</p>
    </template>
  </div>
</template>

<script setup>
defineProps({
  videoUrl: {
    type: String,
    required: true
  }
})

const { youtubeVerification, setVide } = useYoutubeVerification()
</script>

<style scoped></style>
