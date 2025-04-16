<template>
  <div class="bg-[#14171a] font-notoSansTC text-white">
    <LayoutHeader class="container" />
    <div>
      <slot />
    </div>
    <LayoutFooter />
  </div>
</template>

<script setup>
const videoStore = useVideoStore()

onMounted(() => {
  videoStore.getCategoryList()
})
</script>

<style lang="scss" scoped></style>
