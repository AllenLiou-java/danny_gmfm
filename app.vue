<template>
  <div class="bg-primary font-notoSansTC text-white">
    <!-- <CustomLoading /> -->

    <div>
      <LayoutHeader />
      <NuxtPage />
      <LayoutFooter />
    </div>

    <ClientOnly>
      <ModalsContainer />
    </ClientOnly>
    <Sidebar />
  </div>
</template>

<script setup>
import { ModalsContainer } from 'vue-final-modal'
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} %separator %siteName` : '%siteName'
  },
  templateParams: {
    siteName: '秋天剩旅行｜Danny_GMFM 山岳影像創作者',
    separator: '-'
  }
})

useSeoMeta({
  title: '',
  ogTitle: '秋天剩旅行｜Danny_GMFM 山岳影像創作者',
  keywords:
    '秋天剩旅行,Danny_GMFM,山岳影像創作者,台灣百岳,戶外露營,潛水,hikingboydannygmfm,健行筆記-攝影特派員,山野玩家,山友戶外,動態攝影師',
  ogSiteName: '秋天剩旅行｜Danny_GMFM 山岳影像創作者',
  ogType: 'website',
  ogLocale: 'zh_TW',
  ogImage: '/apple-icon.png'
})

const videoStore = useVideoStore()
const productStore = useProductStore()

await callOnce(async () => {
  await videoStore.getVideoCategoryList()
  await productStore.getProductCategoryList()
})
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
