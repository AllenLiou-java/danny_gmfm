export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const url = `/video/${body.id}`

  const data = airtableApi(url)
    .then((record) => {
      const { id, fields } = record

      return {
        id,
        title: fields.title,
        v_id: fields.v_id,
        cover_image: fields.cover_image[0].url,
        content: fields.content,
        related_video: fields.related_video,
        area: fields.area,
        category: fields.category,
        smallcategory: fields.smallcategory,
        related_product: fields.related_product,
        video_no: fields.video_no,
        related_topic: fields.related_topic
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
