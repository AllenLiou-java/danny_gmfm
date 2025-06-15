export const youtubeApi = (url, options) => {
  const { youtubeApikey } = useRuntimeConfig()

  return $fetch(url, {
    baseURL: 'https://www.googleapis.com/youtube/v3',
    ...options,
    query: {
      ...options.query,
      key: youtubeApikey
    }
  })
}
