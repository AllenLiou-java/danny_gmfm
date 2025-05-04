import { defineStore } from 'pinia'

export const useWorkStore = defineStore('work', () => {
  const works = ref([])
  const pageSize = ref(9)

  const worksPerPage = computed(() => {
    const size = pageSize.value
    const data = works.value

    const result = []

    for (let i = 0; i < data.length; i += size) {
      result.push(data.slice(i, i + size))
    }

    return result
  })

  const totalWorks = computed(() => {
    return works.value.length
  })

  const getWorkList = async () => {
    if (works.value.length > 0) return
    const infos = await $fetch('/api/airtable/work')

    works.value = infos
  }

  return {
    works,
    pageSize,
    worksPerPage,
    totalWorks,
    getWorkList
  }
})
