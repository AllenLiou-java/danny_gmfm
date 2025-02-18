import { defineStore } from 'pinia'

export const useVideoStore = defineStore('video', () => {
  const codeVideoCategory = ref([])

  return { codeVideoCategory }
})
