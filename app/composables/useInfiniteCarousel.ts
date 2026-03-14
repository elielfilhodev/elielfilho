export function useInfiniteCarousel<T>(items: T[]) {
  const track = ref<HTMLElement | null>(null)
  const isDown = ref(false)
  const startX = ref(0)
  const scrollLeft = ref(0)
  const isDragging = ref(false)
  let autoTimer: ReturnType<typeof setInterval> | null = null

  const looped = computed(() => [...items, ...items, ...items])

  const onMouseDown = (e: MouseEvent) => {
    if (!track.value) return
    isDown.value = true
    isDragging.value = false
    startX.value = e.pageX - track.value.offsetLeft
    scrollLeft.value = track.value.scrollLeft
    track.value.style.cursor = 'grabbing'
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isDown.value || !track.value) return
    e.preventDefault()
    const x = e.pageX - track.value.offsetLeft
    const delta = Math.abs(x - startX.value)
    // only mark as dragging after 5px movement
    if (delta > 5) isDragging.value = true
    const walk = (x - startX.value) * 1.2
    track.value.scrollLeft = scrollLeft.value - walk
  }

  const onMouseUp = () => {
    isDown.value = false
    if (track.value) track.value.style.cursor = 'grab'
    // reset drag flag after a tick so click handlers can check it
    setTimeout(() => { isDragging.value = false }, 0)
  }

  // Prevent click on children when drag occurred
  const onClickCapture = (e: MouseEvent) => {
    if (isDragging.value) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const onTouchStart = (e: TouchEvent) => {
    if (!track.value) return
    startX.value = (e.touches[0]?.pageX ?? 0) - track.value.offsetLeft
    scrollLeft.value = track.value.scrollLeft
  }

  const onTouchMove = (e: TouchEvent) => {
    if (!track.value) return
    const x = (e.touches[0]?.pageX ?? 0) - track.value.offsetLeft
    track.value.scrollLeft = scrollLeft.value - (x - startX.value) * 1.2
  }

  const onScroll = () => {
    if (!track.value) return
    const el = track.value
    const third = el.scrollWidth / 3
    if (el.scrollLeft >= third * 2) {
      el.scrollLeft -= third
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += third
    }
  }

  const scrollBy = (dir: 1 | -1, amount = 320) => {
    if (!track.value) return
    track.value.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  const startAuto = (interval = 3000, amount = 300) => {
    stopAuto()
    autoTimer = setInterval(() => {
      if (!isDown.value) scrollBy(1, amount)
    }, interval)
  }

  const stopAuto = () => {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null }
  }

  onMounted(() => {
    if (track.value) {
      const third = track.value.scrollWidth / 3
      track.value.scrollLeft = third
      track.value.style.cursor = 'grab'
    }
  })

  onUnmounted(() => stopAuto())

  return {
    track, looped, isDragging,
    onMouseDown, onMouseMove, onMouseUp, onClickCapture,
    onTouchStart, onTouchMove, onScroll,
    scrollBy, startAuto, stopAuto,
  }
}
