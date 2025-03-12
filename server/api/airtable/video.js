export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const data = airtableApi('/video/listRecords', {
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

  return data
})
