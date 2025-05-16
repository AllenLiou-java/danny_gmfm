import { defineStore } from 'pinia'

export const useAboutMeStore = defineStore('aboutMe', () => {
  const aboutMeInfo = ref([])
  const mountainList = ref([])

  const mountainCount = computed(() => {
    return mountainList.value.reduce(
      (acc, item) => {
        const rankNo = Number(item.topMountain_rank_no)
        if (rankNo > 0) {
          acc.inTaiwan++
        } else {
          acc.overseas++
        }
        return acc
      },
      { inTaiwan: 0, overseas: 0 }
    )
  })

  const getInitInfo = async () => {
    if (aboutMeInfo.value.length > 0 || mountainList.value.length > 0) return
    const [aboutMe, mountainHistory] = await Promise.all([
      $fetch('/api/airtable/aboutMe'),
      $fetch('/api/airtable/mountainHistory')
    ])

    aboutMeInfo.value = aboutMe
    mountainList.value = mountainHistory
  }

  const introduction = computed(() => {
    return aboutMeInfo.value
      .filter((item) => item.type === 'introduction')[0]
      ?.content.replace(/\n/g, '</br>')
  })

  const tagList = computed(() => {
    return aboutMeInfo.value.filter((item) => item.type === 'tag')[0]?.content.split('；')
  })

  return {
    aboutMeInfo,
    mountainList,
    mountainCount,
    introduction,
    tagList,
    getInitInfo
  }
})
