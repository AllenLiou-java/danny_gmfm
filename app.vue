<template>
  <div class="bg-[#14171a] font-notoSansTC text-white">
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
