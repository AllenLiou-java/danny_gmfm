import { GoogleSpreadsheet } from 'google-spreadsheet'

export default defineEventHandler(async (event) => {
  const { googleSpreadsheetId } = useRuntimeConfig()
  const isNewVisit = String(getCookie(event, 'isNewVisit')) === 'undefined'

  const doc = new GoogleSpreadsheet(googleSpreadsheetId, googleServiceAuth())
  await doc.loadInfo()
  const sheet_visitCounter = doc.sheetsByTitle.visitCounter
  const rows = await sheet_visitCounter.getRows()

  if (isNewVisit) {
    try {
      const visitNumTotal = await updateVisitCount('visit_num_total')
      const visitNumToday = await updateVisitCount('visit_num_today')

      const maxAge = 60 * 60
      const expires = Math.floor(Date.now() / 1000) + maxAge
      setCookie(event, 'isNewVisit', !isNewVisit, {
        httpOnly: true,
        maxAge,
        expires: new Date(expires * 1000)
      })

      return {
        status: 200,
        data: {
          visitNumTotal,
          visitNumToday
        }
      }
    } catch (error) {
      const statusCode = error.statusCode
      const message = error.data.error
      const statusMessage = error.statusMessage

      throw createError({
        statusCode,
        message,
        statusMessage
      })
    }
  } else {
    const visitNumTotal = rows[0].get('visit_num_total')
    const visitNumToday = rows[0].get('visit_num_today')

    return {
      status: 200,
      data: {
        visitNumTotal,
        visitNumToday
      }
    }
  }

  async function updateVisitCount(col_name) {
    const visitCountBeforeUpdate = parseInt(rows[0].get(col_name))
    const visitCountUpdated = visitCountBeforeUpdate + 1
    rows[0].set(col_name, visitCountUpdated)
    await rows[0].save()

    return visitCountUpdated
  }
})
