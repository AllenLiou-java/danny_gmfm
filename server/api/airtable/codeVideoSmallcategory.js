export default defineEventHandler((event) => {
  const tableId = 'tblgvCYedG967UEN5'
  const url = `/${tableId}/listRecords`

  const data = airtableApi(url, {
    method: 'post',
    body: {
      sort: [{ field: 'id', direction: 'asc' }]
    }
  })
    .then((res) => {
      return res.records.map((item) => {
        const { id, label, label_en, supertype, cover_image } = item.fields

        return {
          id,
          label,
          label_en,
          supertype,
          imgurl: cover_image ? cover_image[0].url : ''
        }
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
