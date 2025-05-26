import { GoogleSpreadsheet } from 'google-spreadsheet'

export default defineEventHandler(async (event) => {
  const { userName, email } = await readBody(event)

  const { googleSpreadsheetId } = useRuntimeConfig()

  const doc = new GoogleSpreadsheet(googleSpreadsheetId, googleServiceAuth())
  await doc.loadInfo()
  const sheet_memberInfo = doc.sheetsByTitle.memberInfo

  const subscribe_date = (function () {
    const now = new Date()
    const _year = now.getFullYear()
    let _month = now.getMonth() + 1
    let _day = now.getDate()
    let _hour = now.getHours()
    let _minutes = now.getMinutes()

    _month = setTimeDateFmt(_month)
    _day = setTimeDateFmt(_day)
    _hour = setTimeDateFmt(_hour)
    _minutes = setTimeDateFmt(_minutes)

    const orderDate = `${_year.toString()}/${_month.toString()}/${_day} ${_hour}:${_minutes}`

    return orderDate
  })()

  function setTimeDateFmt(s) {
    return s < 10 ? '0' + s : s
  }

  try {
    await sheet_memberInfo.addRow({
      name: userName,
      email,
      subscribe_date
    })

    return {
      status: 200,
      result: 'success'
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
})

// const rows = await sheet.getRows()

// console.log('length', rows.length)
// console.log(rows[0].get('name')) // 'Larry Page'
// console.log(rows[0].get('email')) // 'larry@google.com'

// make updates
// rows[1].set('email', 'sergey@abc.xyz')
// await rows[1].save() // save changes

// add new row, returns a GoogleSpreadsheetRow object
// const sundar = await sheet.addRow({ name: 'Sundar Pichai', email: 'sundar@abc.xyz' })
// console.log('sundar', sundar)
