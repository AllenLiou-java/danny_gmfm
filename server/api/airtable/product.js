export default defineEventHandler((event) => {
  const data = airtableApi('/product/listRecords', {
    method: 'post',
    body: {
      sort: [{ field: 'product_no', direction: 'asc' }]
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
