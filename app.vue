<template>
  <div class="bg-primary font-notoSansTC text-white">
    <CustomLoading />

    <LayoutHeader class="container" />
    <NuxtPage />
    <ClientOnly>
      <ModalsContainer />
    </ClientOnly>
    <LayoutFooter />
  </div>
</template>

<script setup>
import { ModalsContainer } from 'vue-final-modal'

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
