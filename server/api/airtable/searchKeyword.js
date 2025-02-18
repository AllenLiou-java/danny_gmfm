export default defineEventHandler((event) => {
  const data = airtableApi('/search_keyword/listRecords', {
    method: 'post',
    body: {
      sort: [{ field: 'keyword', direction: 'asc' }]
    }
  })
    .then((res) => {
      return res.records.map((item) => {
        return item.fields.keyword
      })
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
