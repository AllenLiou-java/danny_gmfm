export default defineEventHandler(async (event) => {
  const mediaObjList = []

  try {
    const { instagramUserid } = useRuntimeConfig()
    const idList = await instagramApi(`/${instagramUserid}/media`).then((res) => {
      return res.data.slice(0, 6).map((idObj) => idObj.id)
    })

    for (let i = 0; i < idList.length; i++) {
      const id = idList[i]
      mediaObjList.push(await getMediaObjPromise(id))
    }
  } catch (res) {
    const { error } = res.data

    throw createError({
      statusCode: 500,
      statusMessage: error.type
    })
  }

  return mediaObjList

  function getMediaObjPromise(pid) {
    return instagramApi(`/${pid}`, {
      query: {
        fields: 'media_type,media_url,permalink'
      }
    })
  }
})
