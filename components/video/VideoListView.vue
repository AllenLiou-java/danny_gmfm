<template>
  <div>
    <template v-if="videosPerPage.length > 0">
      <ul class="mb-15 flex flex-col flex-wrap gap-5 md:flex-row">
        <li
          v-for="(video, idx) in videosPerPage[currentPage - 1]"
          :key="idx"
          v-gsap.whenVisible.stagger.from.once.reversible="{ opacity: 0, y: 50 }"
          :class="[0, 1, 5, 6].includes(idx) ? '2xl:max-w-[590px]' : '2xl:max-w-[386px]'"
          class="relative w-full overflow-hidden rounded-[5px] duration-300 hover:z-10 hover:scale-[1.04] md:w-[calc(50%-10px)]"
        >
          <NuxtLink :to="`/video/detail/${video.id}`">
            <div class="relative">
              <img :src="video.cover_image" alt="coverImg" />
              <div class="img-shadow absolute bottom-0 size-full" />
            </div>

            <p class="text-shorten absolute bottom-0 w-full px-3 pb-3 backdrop-blur-xs">
              {{ video.title }}
            </p>
          </NuxtLink>
        </li>
      </ul>
      <div class="flex-center">
        <vue-awesome-paginate
          v-model="currentPage"
          :total-items="totalVideos"
          :items-per-page="pageSize"
          :max-pages-shown="3"
          paginate-buttons-class="size-10  hover:bg-secondary text-[18px]"
          active-page-class="paginate-active"
          back-button-class="back-btn"
          next-button-class="next-btn"
          @click="turnPage"
        />
      </div>
    </template>
    <template v-else>
      <p class="font-pingFang text-[40px]">無相關影片...</p>
    </template>
  </div>
</template>

<script setup>
const emit = defineEmits(['turnPage'])

const { page } = useRoute().query
const { videosPerPage, pageSize, totalVideos } = storeToRefs(useVideoStore())

const currentPage = ref(parseInt(page))

const turnPage = (pageNo) => {
  emit('turnPage', pageNo)
}
</script>

<style lang="scss" scoped></style>
