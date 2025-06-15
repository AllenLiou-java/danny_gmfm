export default defineEventHandler(async (event) => {
  try {
    const { instagramUserid } = useRuntimeConfig()
    const postList = await instagramApi(`/${instagramUserid}/media`, {
      query: {
        fields: 'id,media_type,media_url,permalink,thumbnail_url'
      }
    }).then((res) => {
      return res.data.slice(0, 6)
    })

    return postList
  } catch (res) {
    const { error } = res.data

    throw createError({
      statusCode: 500,
      statusMessage: error.type
    })
  }
})
