export const airtableApi = (url, options) => {
  const { airtableApiKey, airtableBaseKey, airtableUrl } = useRuntimeConfig()

  return $fetch(url, {
    baseURL: `${airtableUrl}${airtableBaseKey}`,
    headers: {
      Authorization: `Bearer ${airtableApiKey}`
    },
    ...options
  })
}
