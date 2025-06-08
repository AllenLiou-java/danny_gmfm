export const instagramApi = (url, options) => {
  const { instagramAccessToken } = useRuntimeConfig()

  return $fetch(url, {
    baseURL: 'https://graph.instagram.com/v23.0',
    headers: {
      Authorization: `Bearer ${instagramAccessToken}`
    },
    ...options
  })
}
