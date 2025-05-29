<template>
  <div class="text-[12px] tracking-[5px] sm:text-[16px]">
    <p>本日人氣：{{ visitNumToday }}</p>
    <p>累積人氣：{{ visitNumTotal }}</p>
  </div>
</template>

<script setup>
const commonStore = useCommonStore()
const { visitNumTotal, visitNumToday } = storeToRefs(commonStore)

onMounted(async () => {
  await commonStore.updateVisitCount()
})
</script>

<style lang="scss" scoped></style>
