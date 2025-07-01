export default defineEventHandler((event) => {
  const query = getQuery(event)

  // video 表單的 id
  const tableId = 'tbl20P7hV6ZXZTRsm'
  const url = `/${tableId}/${query.id}`

  const data = airtableApi(url)
    .then((record) => {
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
        cover_image: fields.cover_image[0].url,
        related_product: fields.related_product
      }
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
