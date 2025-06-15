export default defineEventHandler(async (event) => {
  let allRecords = []
  let pageToken = null

  do {
    const query = {
      part: 'snippet,contentDetails,status',
      playlistId: 'UUO5Jf1xYlqpLA341Zkr2Zwg',
      maxResults: 50
    }

    if (pageToken) {
      query.pageToken = pageToken
    }

    try {
      const data = await youtubeApi('/playlistItems', {
        query
      })
      pageToken = data.nextPageToken

      allRecords = allRecords.concat(data.items)
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
  } while (pageToken)

  return allRecords
})
