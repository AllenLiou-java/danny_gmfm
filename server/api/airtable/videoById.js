export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const url = `/video/${body.id}`

  const data = airtableApi(url)
    .then((res) => {
      return res.fields
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
