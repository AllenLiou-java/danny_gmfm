export const useTimestampToYYYYMMDD = (timestamp) => {
  const date = new Date(timestamp)
  return date
    .toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .replace(/\//g, '/')
}
