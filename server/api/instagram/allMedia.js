export default defineEventHandler(async (event) => {
  const { instagramUserid } = useRuntimeConfig()
  const { countPerPage, before, after } = await readBody(event)
  const result = {
    postList: [],
    before: '',
    after: ''
  }

  const query = {
    fields: 'id,media_type,media_url,permalink,thumbnail_url,caption,timestamp',
    limit: countPerPage
  }

  if (before) {
    query.before = before
  }

  if (after) {
    query.after = after
  }

  try {
    const { data, paging } = await instagramApi(`/${instagramUserid}/media`, {
      query
    })

    if (Object.prototype.hasOwnProperty.call(paging, 'previous')) {
      result.before = paging.cursors.before
    }

    if (Object.prototype.hasOwnProperty.call(paging, 'next')) {
      result.after = paging.cursors.after
    }

    result.postList = data
  } catch (error) {
    const statusCode = error.statusCode
    const message = error.data.error
    const statusMessage = error.statusMessage

    throw createError({
      statusCode,
      message,
      statusMessage
    })
  }

  return result
})
