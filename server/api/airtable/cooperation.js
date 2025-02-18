export default defineEventHandler((event) => {
  const data = airtableApi('/cooperation/listRecords', {
    method: 'post',
    body: {
      sort: [{ field: 'name', direction: 'asc' }]
    }
  })
    .then((res) => {
      return res.records.map((item) => {
        return item.fields
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
