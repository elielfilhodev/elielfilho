<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { init: initTheme } = useTheme()
const { init: initLocale } = useI18n()
onMounted(() => {
  initTheme()
  initLocale()
})
</script>
