<template>
  <footer class="footer">
    <div class="container">
      <div class="contact-row">
        <p class="contact-label">{{ t.footer.contact }}</p>
        <a href="mailto:elielfilholk@gmail.com" class="contact-link">
          <Icon name="ph:envelope-simple-bold" size="20" />
          elielfilholk@gmail.com
        </a>
      </div>
      <p class="footer-text">
        {{ t.footer.madeWith }} <Icon name="ph:heart-fill" size="13" class="heart" /> {{ t.footer.by }} Eliel Filho · {{ new Date().getFullYear() }}
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding: 48px 0 32px;
}

.contact-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
}

.contact-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text);
  padding: 12px 24px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--bg-card);
  transition: all var(--transition);
}

.contact-link:hover {
  border-color: var(--accent);
  color: var(--accent-hover);
  background: var(--accent-glow);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
}

.footer-text {
  font-size: 0.78rem;
  color: var(--text-muted);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.heart { color: #ef4444; }
</style>
