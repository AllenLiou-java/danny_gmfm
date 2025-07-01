export default defineEventHandler(async (event) => {
  const reqBody = (await readBody(event)) || {}

  let allRecords = []
  let offset = null

  do {
    if (offset) {
      reqBody.offset = offset
    }

    const defaultConfig = {
      sort: [{ field: 'video_no', direction: 'desc' }],
      filterByFormula: "{launched}='true'"
    }

    const tableId = 'tbl90RkFluAvuEePL'
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
      title: fields.title,
      video_no: fields.video_no,
      v_id: fields.v_id,
      cover_image: fields.cover_image[0].url,
      content: fields.content,
      category: fields.category,
      smallcategory: fields.smallcategory,
      related_video: fields.related_video,
      related_product: fields.related_product
    }
  })

  return result
})
