<template>
  <div class="nav-space min-h-[100vh] px-20">
    <h1 class="py-10 text-[44px]">Instagram 貼文列表</h1>
    <table class="w-full table-fixed rounded shadow">
      <colgroup>
        <col class="w-[50px]" />
        <col class="w-[100px]" />
        <col class="w-[300px]" />
        <col class="w-[150px]" />
        <col class="w-[50px]" />
      </colgroup>
      <thead>
        <tr class="text-left">
          <th class="px-4 py-3">日期</th>
          <th class="px-4 py-3">貼文圖片</th>
          <th class="px-4 py-3">描述</th>
          <th class="px-4 py-3">圖片連結</th>
          <th class="px-4 py-3">貼文網址</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, idx) in postList" :key="post.id" class="border-t hover:bg-secondary">
          <td class="px-4 py-3 align-top">{{ useTimestampToYYYYMMDD(post.timestamp) }}</td>
          <td class="px-4 py-3 align-top">
            <div v-if="post.media_type === 'VIDEO'">
              <img :src="post.thumbnail_url" alt="post_image" />
            </div>
            <div v-else>
              <img :src="post.media_url" alt="post_image" />
            </div>
          </td>
          <td class="px-4 py-3 align-top">
            <button
              class="mb-4 block rounded-[4px] bg-yellow px-3 py-1 text-primary"
              type="button"
              @click="copyText(captionRefs[idx])"
            >
              複製
            </button>
            <clientOnly>
              <pre :ref="(el) => (captionRefs[idx] = el)" class="break-words whitespace-pre-wrap">{{
                post.caption
              }}</pre>
            </clientOnly>
          </td>
          <td class="px-4 py-3 align-top">
            <button
              class="mb-4 block rounded-[4px] bg-yellow px-3 py-1 text-primary"
              type="button"
              @click="copyText(mediaUrlRefs[idx])"
            >
              複製
            </button>
            <span :ref="(el) => (mediaUrlRefs[idx] = el)" class="break-words whitespace-pre-wrap">{{
              post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url
            }}</span>
          </td>
          <td class="px-4 py-3 align-top">
            <button
              class="mb-4 block rounded-[4px] bg-yellow px-3 py-1 text-primary"
              type="button"
              @click="copyText(permalinkRefs[idx])"
            >
              複製
            </button>
            <span
              :ref="(el) => (permalinkRefs[idx] = el)"
              class="break-words whitespace-pre-wrap"
              >{{ post.permalink }}</span
            >
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex-center gap-4 py-10">
      <button
        class="h-[50px] w-[80px] self-end rounded-[5px] bg-yellow p-3 text-[14px] font-medium text-primary hover:bg-[#ffe145] disabled:bg-[#c4c3c1] disabled:text-white md:h-[50px] md:w-[110px] md:text-[18px]"
        :disabled="!beforeToken"
        @click="turnPage('before', beforeToken)"
      >
        上一頁
      </button>
      <button
        class="h-[50px] w-[80px] self-end rounded-[5px] bg-yellow p-3 text-[14px] font-medium text-primary hover:bg-[#ffe145] md:h-[50px] md:w-[110px] md:text-[18px]"
        @click="turnPage('after', afterToken)"
      >
        下一頁
      </button>
    </div>
  </div>
</template>

<script setup>
const captionRefs = ref([])
const mediaUrlRefs = ref([])
const permalinkRefs = ref([])

const toast = useToast()

const copyText = async (refs) => {
  const textContent = refs.innerText

  if (textContent) {
    try {
      await navigator.clipboard.writeText(textContent)
      toast.success({ title: 'Success!', message: '複製成功', timeout: 1000 })
    } catch (err) {
      toast.error({ title: 'Error!', message: '複製失敗', timeout: 1000 })
    }
  }
}

const postList = ref([])
const beforeToken = ref(null)
const afterToken = ref(null)

const getPostList = async (turnPageType, turnPageToken) => {
  const body = {
    countPerPage: 10
  }

  if (turnPageType === 'before') {
    body.before = turnPageToken
  }

  if (turnPageType === 'after') {
    body.after = turnPageToken
  }

  const data = await $fetch('/api/instagram/allMedia', {
    method: 'post',
    body
  })

  postList.value = data.postList
  beforeToken.value = data.before
  afterToken.value = data.after
}

const turnPage = (turnPageType, turnPageToken) => {
  getPostList(turnPageType, turnPageToken)
  window.scrollTo({
    top: 0
  })
}

onMounted(() => {
  getPostList()
})
</script>

<style lang="scss" scoped></style>
