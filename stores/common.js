import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () => {
  const cooperationList = ref([])

  const getCooperationList = async () => {
    if (cooperationList.value.length > 0) return

    cooperationList.value = await $fetch('/api/airtable/cooperation')
  }
  return {
    cooperationList,
    getCooperationList
  }
})
