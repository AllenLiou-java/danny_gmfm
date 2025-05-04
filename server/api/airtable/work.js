export default defineEventHandler(async (event) => {
  let allRecords = []
  let offset = null
  do {
    if (offset) {
      body.offset = offset
    }

    const data = await airtableApi('/work/listRecords', {
      method: 'post',
      body: {
        sort: [{ field: 'title', direction: 'asc' }]
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
      cover_image: fields.image[0].url,
      content: fields.content,
      cooperate: fields.cooperate,
      subTitle: fields.subTitle,
      link_youtube: fields.link_youtube || null,
      link_ig: fields.link_ig || null,
      link_fb: fields.link_fb || null,
      link_google: fields.google || null,
      link_other: fields.link_other || null
    }
  })

  return result

  // const data = airtableApi('/work/listRecords', {
  //   method: 'post',
  //   body: {
  //     sort: [{ field: 'title', direction: 'asc' }]
  //   }
  // })
  //   .then((res) => {
  //     return res
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
