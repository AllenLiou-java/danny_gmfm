import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () => {
  const cooperationList = ref([])

  const getCooperationList = async () => {
    if (cooperationList.value.length > 0) return

    cooperationList.value = await $fetch('/api/airtable/cooperation')
  }

  // 統一管理 CustomLoading.vue的顯示
  const isLoading = ref(false)
  const setLoadingStatus = (status) => {
    isLoading.value = status
  }
  return {
    cooperationList,
    getCooperationList,
    isLoading,
    setLoadingStatus
  }
})
