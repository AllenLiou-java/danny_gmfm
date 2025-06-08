export default defineNuxtPlugin(() => {
  if (import.meta.client && !window.FB) {
    if (!document.getElementById('fb-root')) {
      const fbRoot = document.createElement('div')
      fbRoot.id = 'fb-root'
      document.body.prepend(fbRoot)
    }

    const script = document.createElement('script')
    script.src = 'https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v19.0'
    script.async = true
    script.defer = true
    document.body.appendChild(script)
  }
})
