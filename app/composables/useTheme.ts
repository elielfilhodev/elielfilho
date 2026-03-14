export const useTheme = () => {
  const isDark = useState('theme', () => true)

  const toggle = () => {
    isDark.value = !isDark.value
    if (process.client) {
      document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
    }
  }

  const init = () => {
    if (process.client) {
      const saved = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = saved ? saved === 'dark' : prefersDark
      document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
    }
  }

  watch(isDark, (val) => {
    if (process.client) {
      localStorage.setItem('theme', val ? 'dark' : 'light')
      document.documentElement.setAttribute('data-theme', val ? 'dark' : 'light')
    }
  })

  return { isDark, toggle, init }
}
