<template>
  <div class="relative h-[100vh] bg-primary">
    <div
      class="relative top-[50%] left-[50%] h-[95vh] w-[95vw] -translate-[50%] bg-[url(~/assets/images/home/subscribe/desktop.png)] bg-cover bg-center"
    >
      <div class="flex-center relative top-36 flex-col gap-y-4">
        <h1 class="text-8xl text-white">404</h1>
        <h2 class="text-3xl text-white">查無此頁面</h2>
        <h2 class="text-2xl text-white">Page not found</h2>

        <button class="block rounded-[5px] bg-yellow px-6 py-3 text-primary" @click="handleError">
          前往首頁
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const event = useRequestEvent()

if (event) {
  setResponseStatus(event, 404, 'Page Not Found')
}

const handleError = () => clearError({ redirect: '/' })
</script>

<style lang="scss" scoped></style>
