export default function () {
  const statusList = [
    {
      statusCode: 404,
      error: 'Page not found',
      errorCH: '查無此頁面'
    },
    {
      code: 500,
      error: 'Internal Server Error',
      errorCH: '內部伺服器錯誤'
    },
    {
      code: 500,
      error: 'IGApiException',
      errorCH: 'IG API 串接失敗'
    },
    {
      code: 500,
      error: 'OAuthException',
      errorCH: 'IG API 權限不足'
    }
  ]

  const mapErrorMessage = (statusError, statusCode) => {
    const statusMatched = statusList.filter((status) => {
      return status.code === statusCode && status.error === statusError
    })

    if (statusMatched.length > 0) {
      return statusMatched[0].errorCH
    } else {
      return '未知錯誤'
    }
  }

  return {
    mapErrorMessage
  }
}
