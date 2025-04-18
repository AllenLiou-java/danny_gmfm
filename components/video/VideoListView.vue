<template>
  <div>
    <template v-if="videosPerPage.length > 0">
      <ul class="flex flex-col flex-wrap gap-5 md:flex-row md:justify-between">
        <li
          v-for="(page, idx) in videosPerPage"
          :key="idx"
          :class="[0, 1, 5, 6].includes(idx) ? '2xl:max-w-[590px]' : '2xl:max-w-[386px]'"
          class="relative w-full overflow-hidden rounded-[5px] duration-300 hover:z-10 hover:scale-[1.04] md:w-[calc(50%-10px)]"
        >
          <NuxtLink :to="`/video/detail/${page.id}`">
            <img :src="page.cover_image" alt="coverImg" />
            <p class="text-shorten absolute bottom-0 w-full px-3 pb-3 backdrop-blur-xs">
              {{ page.title }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </template>
    <template v-else>
      <p>無相關影片</p>
    </template>
  </div>
</template>

<script setup>
defineProps({
  videosPerPage: {
    type: Array,
    default() {
      return []
    }
  }
})
</script>

<style lang="scss" scoped></style>
