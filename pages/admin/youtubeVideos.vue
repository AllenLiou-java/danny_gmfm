<template>
  <div>
    <table
      class="w-full table-fixed text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
    >
      <colgroup>
        <col class="w-[200px]" />
        <col class="w-[100px]" />
        <col class="w-[100px]" />
        <col class="w-[100px]" />
        <col class="w-[500px]" />
      </colgroup>
      <thead class="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">貼文圖片</th>
          <th scope="col" class="px-6 py-3">Title</th>
          <th scope="col" class="px-6 py-3">v_id</th>
          <th scope="col" class="px-6 py-3">Cover Image</th>
          <th scope="col" class="px-6 py-3">Content</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(video, idx) in ytVideos"
          :key="video.id"
          class="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td class="px-4 py-3 align-top">
            <img :src="video.snippet.thumbnails.maxres.url" alt="cover_image" />
          </td>
          <td class="px-4 py-3 align-top">
            <button
              class="mb-4 block rounded-[4px] bg-yellow px-3 py-1 text-primary"
              type="button"
              @click="copyText(titleRefs[idx])"
            >
              複製
            </button>
            <span :ref="(el) => (titleRefs[idx] = el)">{{ video.snippet.title }}</span>
          </td>
          <td class="px-4 py-3 align-top break-words whitespace-normal">
            <button
              class="mb-4 block rounded-[4px] bg-yellow px-3 py-1 text-primary"
              type="button"
              @click="copyText(vidRefs[idx])"
            >
              複製
            </button>
            <span :ref="(el) => (vidRefs[idx] = el)">{{ video.snippet.resourceId.videoId }}</span>
          </td>
          <td class="px-4 py-3 align-top break-words whitespace-normal">
            <button
              class="mb-4 block rounded-[4px] bg-yellow px-3 py-1 text-primary"
              type="button"
              @click="copyText(coverImageRefs[idx])"
            >
              複製
            </button>
            <span :ref="(el) => (coverImageRefs[idx] = el)">{{
              video.snippet.thumbnails.maxres.url
            }}</span>
          </td>
          <td class="px-4 py-3 align-top">
            <button
              v-if="video.snippet.description.length > 0"
              class="mb-4 block rounded-[4px] bg-yellow px-3 py-1 text-primary"
              type="button"
              @click="copyText(contentRefs[idx])"
            >
              複製
            </button>
            <clientOnly>
              <pre :ref="(el) => (contentRefs[idx] = el)" class="break-words whitespace-pre-wrap">{{
                video.snippet.description
              }}</pre>
            </clientOnly>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const { data: ytVideos } = await useFetch('/api/youtube/videos')
const titleRefs = ref([])
const vidRefs = ref([])
const coverImageRefs = ref([])
const contentRefs = ref([])

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
</script>

<style lang="scss" scoped></style>
