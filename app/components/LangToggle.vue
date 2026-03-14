<template>
  <button class="lang-btn" @click="toggle" :aria-label="`Mudar para ${locale === 'pt' ? 'English' : 'Português'}`">
    <span class="flag">{{ locale === 'pt' ? '🇧🇷' : '🇺🇸' }}</span>
    <span class="label">{{ locale === 'pt' ? 'PT' : 'EN' }}</span>
  </button>
</template>

<script setup lang="ts">
const { locale, toggle } = useI18n()
</script>

<style scoped>
.lang-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 38px;
  padding: 0 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: inherit;
  letter-spacing: 0.04em;
  transition: all var(--transition);
}

.lang-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-glow);
}

.flag { font-size: 0.9rem; line-height: 1; }
</style>
