export const useYoutubeVerification = () => {
  /*
   *  由於需要取得匹配後的字串，因此此處使用match()。
   *  match()：當符合條件時返回一個陣列，否則返回null。
   */

  const youtubeVerification = (data) => {
    // 驗證格式
    const youtubeRegex =
      // eslint-disable-next-line no-useless-escape
      /(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|live\/))([^"&?\/\s]{11})/
    return data.match(youtubeRegex)?.[1] || null
  }

  const setVide = (videoUrl) => {
    // youtube影片 ID
    const videoId = youtubeVerification(videoUrl)
    // 確認 videoId 存在後返回嵌入鏈接
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  }

  return {
    youtubeVerification,
    setVide
  }
}
