export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) || {}
  let allRecords = []
  let offset = null

  do {
    if (offset) {
      body.offset = offset
    }

    const data = await airtableApi('/product/listRecords', {
      method: 'post',
      body
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

    offset = data.offset
    allRecords = allRecords.concat(data.records)
  } while (offset)

  const result = allRecords.map((record) => {
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

  return result

  // const body = await readBody(event)

  // const data = airtableApi('/product/listRecords', {
  //   method: 'post',
  //   body
  // })
  //   .then((res) => {
  //     const records = res.records
  //     if (records.length === 0) return records

  //     return records.map((record) => {
  //       const { id, fields } = record
  //       return {
  //         id,
  //         name: fields.name,
  //         content: fields.content,
  //         images: fields.images,
  //         discount: fields.discount,
  //         category: fields.category,
  //         smallcategory: fields.smallcategory,
  //         product_no: fields.product_no,
  //         cover_image: fields.cover_image[0].url
  //       }
  //     })
  //   })
  //   .catch((error) => {
  //     const statusCode = error.statusCode
  //     const message = error.data.error
  //     const statusMessage = error.statusMessage

  //     throw createError({
  //       statusCode,
  //       message,
  //       statusMessage
  //     })
  //   })

  // return data
})
