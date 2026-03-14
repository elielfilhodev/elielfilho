<template>
  <svg :viewBox="`0 0 ${size} ${size}`" class="radar" :width="size" :height="size">
    <!-- Grid rings -->
    <g v-for="ring in rings" :key="ring">
      <polygon
        :points="getPolygonPoints(ring)"
        fill="none"
        stroke="var(--border)"
        stroke-width="1"
      />
    </g>

    <!-- Axis lines -->
    <line
      v-for="(_, i) in items"
      :key="'axis-' + i"
      :x1="cx"
      :y1="cy"
      :x2="getPoint(i, 1).x"
      :y2="getPoint(i, 1).y"
      stroke="var(--border)"
      stroke-width="1"
    />

    <!-- Data polygon -->
    <polygon
      :points="dataPoints"
      :fill="fillColor"
      :stroke="strokeColor"
      stroke-width="2"
      stroke-linejoin="round"
      class="data-poly"
    />

    <!-- Dots -->
    <circle
      v-for="(item, i) in items"
      :key="'dot-' + i"
      :cx="getPoint(i, visible ? item.level / 100 : 0).x"
      :cy="getPoint(i, visible ? item.level / 100 : 0).y"
      r="4"
      :fill="strokeColor"
      class="dot"
      @mouseenter="hovered = i"
      @mouseleave="hovered = -1"
    />

    <!-- Tooltip -->
    <g v-if="hovered >= 0 && items[hovered]">
      <rect
        :x="getPoint(hovered, visible ? safeItem(hovered).level / 100 : 0).x - 36"
        :y="getPoint(hovered, visible ? safeItem(hovered).level / 100 : 0).y - 28"
        width="72"
        height="22"
        rx="6"
        fill="var(--bg-card)"
        stroke="var(--border)"
        stroke-width="1"
      />
      <text
        :x="getPoint(hovered, visible ? safeItem(hovered).level / 100 : 0).x"
        :y="getPoint(hovered, visible ? safeItem(hovered).level / 100 : 0).y - 13"
        text-anchor="middle"
        font-size="10"
        font-weight="600"
        fill="var(--text)"
        font-family="JetBrains Mono, monospace"
      >{{ safeItem(hovered).name }} {{ safeItem(hovered).level }}%</text>
    </g>

    <!-- Labels -->
    <text
      v-for="(item, i) in items"
      :key="'label-' + i"
      :x="getLabelPos(i).x"
      :y="getLabelPos(i).y"
      text-anchor="middle"
      dominant-baseline="middle"
      font-size="10"
      font-weight="500"
      fill="var(--text-muted)"
      class="label"
    >{{ item.name }}</text>
  </svg>
</template>

<script setup lang="ts">
interface SkillItem { name: string; level: number; icon: string }

const props = defineProps<{
  items: SkillItem[]
  color: string
  visible: boolean
  size?: number
}>()

const size = computed(() => props.size ?? 300)
const cx = computed(() => size.value / 2)
const cy = computed(() => size.value / 2)
const radius = computed(() => size.value * 0.36)
const labelRadius = computed(() => size.value * 0.47)
const rings = [0.25, 0.5, 0.75, 1]

const hovered = ref(-1)

const safeItem = (i: number) => props.items[i]!
const strokeColor = computed(() => {
  const m = props.color.match(/#[0-9a-fA-F]{6}/)
  return m?.[0] ?? '#6366f1'
})
const fillColor = computed(() => strokeColor.value + '28')

const angle = (i: number) => (Math.PI * 2 * i) / props.items.length - Math.PI / 2

const getPoint = (i: number, ratio: number) => ({
  x: cx.value + Math.cos(angle(i)) * radius.value * ratio,
  y: cy.value + Math.sin(angle(i)) * radius.value * ratio,
})

const getPolygonPoints = (ratio: number) =>
  props.items.map((_, i) => {
    const p = getPoint(i, ratio)
    return `${p.x},${p.y}`
  }).join(' ')

const dataPoints = computed(() =>
  props.items.map((item, i) => {
    const p = getPoint(i, props.visible ? item.level / 100 : 0)
    return `${p.x},${p.y}`
  }).join(' ')
)

const getLabelPos = (i: number) => ({
  x: cx.value + Math.cos(angle(i)) * labelRadius.value,
  y: cy.value + Math.sin(angle(i)) * labelRadius.value,
})
</script>

<style scoped>
.radar { overflow: visible; }

.data-poly {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.dot {
  cursor: pointer;
  transition: r 0.2s ease;
}

.dot:hover { r: 6; }

.label { pointer-events: none; user-select: none; }
</style>
