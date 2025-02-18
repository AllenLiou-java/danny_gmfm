export default defineEventHandler((event) => {
  const data = airtableApi('/video/listRecords', {
    method: 'post',
    body: {
      sort: [{ field: 'video_no', direction: 'desc' }]
    }
  })
    .then((res) => {
      return res
    })
    .catch((error) => {
      const statusCode = error.statusCode
      const message = error.data.error
      const statusMessage = error.statusMessage

      throw createError({
        statusCode,
        message,
        statusMessage
      })
    })

  return data
})
