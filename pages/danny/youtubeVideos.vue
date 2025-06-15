<template>
  <div class="nav-space px-20">
    <table class="w-full table-fixed rounded shadow">
      <colgroup>
        <col class="w-[50px]" />
        <col class="w-[100px]" />
        <col class="w-[100px]" />
        <col class="w-[100px]" />
        <col class="w-[500px]" />
      </colgroup>
      <thead>
        <tr class="text-left">
          <th class="px-4 py-3">Item</th>
          <th class="px-4 py-3">Title</th>
          <th class="px-4 py-3">v_id</th>
          <th class="px-4 py-3">Cover Image</th>
          <th class="px-4 py-3">Content</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(video, idx) in ytVideos" :key="video.id" class="border-t hover:bg-secondary">
          <td class="px-4 py-3">{{ idx + 1 }}</td>
          <td class="px-4 py-3">
            <span :ref="(el) => (titleRefs[idx] = el)">{{ video.snippet.title }}</span>
            <button
              class="mt-4 block rounded-[4px] bg-yellow px-3 py-1 text-primary"
              type="button"
              @click="copyText(titleRefs[idx])"
            >
              複製
            </button>
          </td>
          <td class="px-4 py-3 break-words whitespace-normal">
            <span :ref="(el) => (vidRefs[idx] = el)">{{ video.snippet.resourceId.videoId }}</span>
            <button
              class="mt-4 block rounded-[4px] bg-yellow px-3 py-1 text-primary"
              type="button"
              @click="copyText(vidRefs[idx])"
            >
              複製
            </button>
          </td>
          <td class="px-4 py-3 break-words whitespace-normal">
            <span :ref="(el) => (coverImageRefs[idx] = el)">{{
              video.snippet.thumbnails.maxres.url
            }}</span>
            <button
              class="mt-4 block rounded-[4px] bg-yellow px-3 py-1 text-primary"
              type="button"
              @click="copyText(coverImageRefs[idx])"
            >
              複製
            </button>
          </td>
          <td class="px-4 py-3">
            <button
              v-if="video.snippet.description.length > 0"
              class="mb-4 block rounded-[4px] bg-yellow px-3 py-1 text-primary"
              type="button"
              @click="copyText(contentRefs[idx])"
            >
              複製
            </button>
            <clientOnly>
              <pre :ref="(el) => (contentRefs[idx] = el)">{{ video.snippet.description }}</pre>
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
