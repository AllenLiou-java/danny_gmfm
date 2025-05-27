export default function () {
  const lockScroll = () => {
    document.documentElement.style.overflow = 'hidden'
  }

  const unlockScroll = () => {
    document.documentElement.style.overflow = 'visible'
  }

  return {
    lockScroll,
    unlockScroll
  }
}
