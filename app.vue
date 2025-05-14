<template>
  <div class="bg-primary font-notoSansTC text-white">
    <!-- <InitScreen /> -->
    <!-- <CustomLoading /> -->
    <LayoutHeader class="container" />

    <div>
      <NuxtPage />
    </div>

    <LayoutFooter />
  </div>
</template>

<script setup>
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
