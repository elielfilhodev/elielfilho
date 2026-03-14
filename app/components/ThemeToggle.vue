<template>
  <button class="theme-btn" @click="toggle" :aria-label="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'">
    <Icon :name="isDark ? 'ph:sun-bold' : 'ph:moon-bold'" size="18" />
  </button>
</template>

<script setup lang="ts">
const { isDark, toggle } = useTheme()
</script>

<style scoped>
.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--transition);
}
.theme-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-glow);
}
</style>
