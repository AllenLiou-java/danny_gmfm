<template>
  <div class="relative h-[100vh] bg-primary">
    <div
      class="relative top-[50%] left-[50%] h-[95vh] w-[95vw] -translate-[50%] bg-[url(~/assets/images/home/subscribe/desktop.png)] bg-cover bg-center"
    >
      <div class="flex-center relative top-36 flex-col">
        <h1 class="text-[120px] text-white">{{ error.statusCode }}</h1>
        <h2 class="mb-4 text-[32px] text-white">
          {{ mapErrorMessage(error.statusMessage, error.statusCode) }}
        </h2>

        <button class="h-[48px] w-[110px] rounded-[5px] bg-yellow font-bold" @click="handleError">
          前往首頁
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { mapErrorMessage } = errorHandler()
defineProps({
  error: {
    type: Object,
    required: true
  }
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style lang="scss" scoped></style>
