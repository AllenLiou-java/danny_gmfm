export default defineEventHandler((event) => {
  const data = airtableApi('/code_product_bigcategory/listRecords', {
    method: 'post',
    body: {
      sort: [{ field: 'id', direction: 'asc' }]
    }
  })
    .then((res) => {
      return res.records.map((item) => {
        const { id, label, label_en, cover_image } = item.fields
        return {
          id,
          label,
          label_en,
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
