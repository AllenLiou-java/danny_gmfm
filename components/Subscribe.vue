<template>
  <div>
    <div
      v-gsap.whenVisible.from.once="{ opacity: 0, y: 50 }"
      class="min-h-[410px] bg-[url(~/assets/images/home/subscribe/desktop.png)] bg-cover bg-bottom py-8 sm:min-h-[700px] sm:py-12 md:py-15"
    >
      <div class="container">
        <h2
          class="mb-6 text-center font-paintinfChoco text-[32px] leading-[1] text-white sm:mb-8 sm:text-[100px] md:text-[130px]"
        >
          SUBSCRIBE
        </h2>
        <form class="mx-auto max-w-[450px] md:max-w-[660px]" @submit.prevent="onSubmit">
          <div class="flex flex-col items-center justify-center gap-3 md:flex-row">
            <div class="w-full md:w-[168px]">
              <input
                v-model="userName"
                class="w-full rounded-[5px] bg-white px-3 py-3 text-[16px] text-primary focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-secondary md:w-[168px] md:px-6 md:py-4 md:text-[18px]"
                type="text"
                v-bind="userNameAttrs"
                placeholder="姓名"
              />
              <div class="mx-1 block text-[#c41609] md:hidden">{{ errors.userName }}</div>
            </div>
            <div class="w-full md:w-[352px]">
              <input
                v-model="email"
                class="w-full rounded-[5px] bg-white px-3 py-3 text-[16px] text-primary focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-secondary md:w-[352px] md:px-6 md:py-4 md:text-[18px]"
                type="email"
                v-bind="emailAttrs"
                placeholder="E-mail"
              />
              <div class="mx-1 block text-[#c41609] md:hidden">{{ errors.email }}</div>
            </div>

            <button
              :disabled="isSubmitting"
              type="submit"
              class="h-[50px] w-[80px] self-end rounded-[5px] bg-yellow p-4 text-[14px] text-primary hover:bg-[#ffe145] md:h-[60px] md:w-[110px] md:text-[18px]"
            >
              {{ isSubmitting ? '送出中' : '訂閱' }}
            </button>
          </div>

          <div class="mx-2 hidden text-[#c41609] md:flex md:flex-col">
            <div>{{ errors.userName }}</div>
            <div>{{ errors.email }}</div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'

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
  alert('訂閱成功')
  resetForm()
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

<style lang="scss" scoped></style>
