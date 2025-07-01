export default defineEventHandler(async (event) => {
  const reqBody = (await readBody(event)) || {}

  let allRecords = []
  let offset = null

  do {
    if (offset) {
      reqBody.offset = offset
    }

    const defaultConfig = {
      sort: [{ field: 'product_no', direction: 'desc' }],
      filterByFormula: "{launched}='true'"
    }

    const tableId = 'tbl20P7hV6ZXZTRsm'
    const url = `/${tableId}/listRecords`

    const data = await airtableApi(url, {
      method: 'post',
      body: {
        ...defaultConfig,
        ...reqBody
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

    offset = data.offset
    allRecords = allRecords.concat(data.records)
  } while (offset)

  const result = allRecords.map((record) => {
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

  return result
})
