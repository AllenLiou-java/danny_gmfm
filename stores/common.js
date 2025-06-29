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

  // 管理InitScreen的顯示
  const isInitScreenClosed = ref(false)

  // 訪客計數器
  const visitNumTotal = ref(null)
  const visitNumToday = ref(null)

  const updateVisitCount = async () => {
    const { data } = await $fetch('/api/googleSpreadsheets/updateVisitCount')

    visitNumTotal.value = data.visitNumTotal
    visitNumToday.value = data.visitNumToday
  }

  const latest6InstagramMediaObj = ref([])
  const getLatest6InstagramMediaObj = async () => {
    try {
      const data = await $fetch('/api/instagram/latest6Media')
      latest6InstagramMediaObj.value = data
    } catch (err) {
      const { statusCode, statusMessage } = err

      showError({
        statusCode,
        statusMessage
      })
    }
  }

  return {
    cooperationList,
    getCooperationList,
    isLoading,
    setLoadingStatus,
    isInitScreenClosed,
    visitNumTotal,
    visitNumToday,
    updateVisitCount,
    latest6InstagramMediaObj,
    getLatest6InstagramMediaObj
  }
})
