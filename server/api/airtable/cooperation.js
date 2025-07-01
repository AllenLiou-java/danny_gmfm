export default defineEventHandler((event) => {
  const tableId = 'tblcS2gHPXLNnkP1S'
  const url = `/${tableId}/listRecords`

  const data = airtableApi(url, {
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
