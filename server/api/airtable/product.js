export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const data = airtableApi('/product/listRecords', {
    method: 'post',
    body
  })
    .then((res) => {
      const records = res.records
      if (records.length === 0) return records

      return records.map((record) => {
        const { id, fields } = record
        return {
          id,
          name: fields.name,
          content: fields.content,
          images: fields.images,
          discount: fields.discount,
          category: fields.category,
          smallcategory: fields.smallcategory,
          product_no: fields.product_no,
          cover_image: fields.cover_image[0].url
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
