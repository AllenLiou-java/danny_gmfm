<template>
  <div class="nav-space container min-h-[70vh]">
    <div class="mt-10 mb-4 flex gap-5 border-b-2 border-solid border-gray-800 text-[24px]">
      <NuxtLink
        class="rounded-tl-[6px] rounded-tr-[6px] px-6 py-2"
        :to="{ name: 'admin-youtubeVideos' }"
        >Youtube貼文列表</NuxtLink
      >
      <NuxtLink
        class="rounded-tl-[6px] rounded-tr-[6px] px-6 py-2"
        :to="{ name: 'admin-instagramPosts' }"
        >Instagram貼文列表</NuxtLink
      >
    </div>

    <NuxtPage />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
      if (to.name === 'admin') {
        return navigateTo({ name: 'admin-youtubeVideos' })
      }
    }
  ]
})
</script>

<style scoped>
.router-link-exact-active {
  background-color: var(--color-yellow);
  color: var(--color-secondary);
}
</style>
