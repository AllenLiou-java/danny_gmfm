<template>
  <div>
    <div
      class="min-h-[410px] bg-[url(~/assets/images/home/subscribe/desktop.png)] bg-cover bg-bottom py-8 sm:min-h-[700px] sm:py-12 md:py-15"
    >
      <div class="container">
        <h2
          class="mb-6 text-center font-paintinfChoco text-[32px] leading-[1] text-white sm:mb-8 sm:text-[100px] md:text-[130px]"
        >
          SUSCRIBE
        </h2>
        <form
          class="mb-6 flex flex-col items-center justify-center gap-3 md:flex-row"
          action=""
          @submit.prevent="onSubmit"
        >
          <input
            class="w-full rounded-[5px] bg-white px-3 py-3 text-[16px] text-primary outline-primary placeholder:opacity-30 md:w-[168px] md:px-6 md:py-4 md:text-[18px]"
            type="text"
            name="userName"
            placeholder="姓名"
          />
          <input
            class="w-full rounded-[5px] bg-white px-3 py-3 text-[16px] text-primary outline-primary placeholder:opacity-30 md:w-[352px] md:px-6 md:py-4 md:text-[18px]"
            type="email"
            name="userEmail"
            placeholder="E-mail"
          />
          <button
            type="submit"
            class="self-end rounded-[5px] bg-yellow px-6 py-4 text-[14px] text-primary hover:bg-[#ffe145] md:px-9 md:text-[18px]"
          >
            訂閱
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const onSubmit = (event) => {
  console.log('SUSCRIBE')
}
</script>

<style lang="scss" scoped></style>
