<template>
  <VueFinalModal
    class="flex-center"
    content-class="flex flex-col items-center relative max-w-[335px] sm:max-w-[600px] w-full h-[500px]  bg-cover bg-center pt-16 sm:pt-11 rounded-[8px] bg-[url(~/assets/images/home/subscribe/tablet.png)]"
  >
    <svg
      class="absolute top-3 right-3 size-[42px] cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      @click="emit('closeModal')"
    >
      <path
        fill="#ffffff"
        d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"
      />
    </svg>

    <h2
      class="mt-1 mb-6 font-paintinfChoco text-[48px] leading-[1] text-white sm:mb-8 sm:text-[80px]"
    >
      {{ title }}
    </h2>
    <form class="w-[295px] sm:w-[405px]" @submit.prevent="onSubmit">
      <div class="flex-center flex-col gap-3 md:gap-4">
        <div class="w-full">
          <input
            v-model="userName"
            class="w-full rounded-[5px] bg-white px-3 py-3 text-[16px] text-primary focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-secondary md:px-6 md:py-4 md:text-[18px]"
            type="text"
            v-bind="userNameAttrs"
            placeholder="姓名"
          />
          <div class="mx-1 block text-[14px] text-[#c41609] md:hidden">{{ errors.userName }}</div>
        </div>
        <div class="w-full">
          <input
            v-model="email"
            class="w-full rounded-[5px] bg-white px-3 py-3 text-[16px] text-primary focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-secondary md:px-6 md:py-4 md:text-[18px]"
            type="email"
            v-bind="emailAttrs"
            placeholder="E-mail"
          />
          <div class="mx-1 block text-[14px] text-[#c41609] md:hidden">{{ errors.email }}</div>
        </div>

        <button
          :disabled="isSubmitting"
          type="submit"
          class="h-[50px] w-[80px] self-end rounded-[5px] bg-yellow p-3 text-[14px] font-medium text-primary hover:bg-[#ffe145] md:h-[50px] md:w-[110px] md:text-[18px]"
        >
          {{ isSubmitting ? '送出中' : '訂閱' }}
        </button>
      </div>

      <div class="mx-2 hidden text-[#c41609] md:flex md:flex-col">
        <div>{{ errors.userName }}</div>
        <div>{{ errors.email }}</div>
      </div>
    </form>
  </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'

import { useForm } from 'vee-validate'
import * as yup from 'yup'

defineProps({
  title: {
    type: String,
    default: 'test'
  }
})
const emit = defineEmits(['closeModal'])

const commonStore = useCommonStore()

const { resetForm, errors, handleSubmit, defineField, isSubmitting } = useForm({
  validationSchema: yup.object({
    userName: yup.string().required('請填入姓名'),
    email: yup.string().email('請確認email格式是否正確').required('請填入Email')
  })
})

const onSubmit = handleSubmit(async (values) => {
  const { userName, email } = values
  commonStore.setLoadingStatus(true)

  await new Promise((resolve) => {
    setTimeout(() => {
      $fetch('/api/googleSpreadsheets/subscribeInfo', {
        method: 'post',
        body: {
          userName,
          email
        }
      })

      resolve()
    }, 2000)
  })

  commonStore.setLoadingStatus(false)

  resetForm()
  emit('closeModal')
  $fetch('/api/gmail/subscribeMail', {
    method: 'post',
    body: {
      email
    }
  })
})

const [email, emailAttrs] = defineField('email')
const [userName, userNameAttrs] = defineField('userName')
</script>

<style scoped></style>
