export default defineEventHandler(async (event) => {
  const { instagramUserid } = useRuntimeConfig()
  const idList = await instagramApi(`/${instagramUserid}/media`).then((res) => {
    return res.data.slice(0, 6).map((idObj) => idObj.id)
  })

  const mediaObjList = []

  for (let i = 0; i < idList.length; i++) {
    const id = idList[i]
    mediaObjList.push(await getMediaObjPromise(id))
  }

  function getMediaObjPromise(pid) {
    return instagramApi(`/${pid}`, {
      query: {
        fields: 'media_type,media_url,permalink'
      }
    })
  }

  return mediaObjList
})
