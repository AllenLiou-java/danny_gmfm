export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const url = `/product/${body.id}`

  const data = airtableApi(url)
    .then((record) => {
      const { id, fields } = record

      const relatedProduct = []

      const productIndex = ['one', 'two', 'three', 'four']

      productIndex.forEach((index) => {
        const id = fields[`product_${index}_id`]
        const name = fields[`product_${index}_name`]
        const image = fields[`product_${index}_image`]

        if (id && name && image) {
          relatedProduct.push({
            id,
            name,
            cover_image: image[0].url
          })
        }
      })

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
        relatedProduct
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
