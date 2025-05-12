<template>
  <div class="bg-primary font-notoSansTC text-white">
    <InitScreen />
    <CustomLoading />
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

<style lang="scss" scoped></style>
