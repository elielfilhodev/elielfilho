<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-inner">
      <a href="#top" class="nav-logo">EF<span class="dot">.</span></a>

      <!-- Desktop links -->
      <ul class="nav-links">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" class="nav-link" :class="{ active: active === link.href }">
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- Desktop actions -->
      <div class="nav-actions">
        <a href="mailto:elielfilholk@gmail.com" class="nav-icon-btn" :aria-label="t.nav.contact">
          <Icon name="ph:envelope-simple-bold" size="18" />
        </a>
        <LangToggle />
        <ThemeToggle />
      </div>

      <!-- Mobile: actions + hamburger -->
      <div class="nav-mobile">
        <LangToggle />
        <ThemeToggle />
        <button class="hamburger" @click="menuOpen = !menuOpen" :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'">
          <Icon :name="menuOpen ? 'ph:x-bold' : 'ph:list-bold'" size="20" />
        </button>
      </div>
    </div>

    <!-- Mobile dropdown -->
    <Transition name="menu">
      <div v-if="menuOpen" class="mobile-menu" @click="menuOpen = false">
        <a v-for="link in links" :key="link.href" :href="link.href" class="mobile-link" :class="{ active: active === link.href }">
          {{ link.label }}
        </a>
        <a href="mailto:elielfilholk@gmail.com" class="mobile-link">
          <Icon name="ph:envelope-simple-bold" size="16" />
          {{ t.nav.contact }}
        </a>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const { t } = useI18n()
const isScrolled = ref(false)
const active = ref('')
const menuOpen = ref(false)

const links = computed(() => [
  { href: '#skills', label: t.value.nav.skills },
  { href: '#projects', label: t.value.nav.projects },
  { href: '#books', label: t.value.nav.books },
])

onMounted(() => {
  const onScroll = () => {
    isScrolled.value = window.scrollY > 20
    const scrollY = window.scrollY + 120
    links.value.forEach(link => {
      const el = document.querySelector(link.href) as HTMLElement | null
      if (!el) return
      if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
        active.value = link.href
      }
    })
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 24px;
  transition: background var(--transition), border-color var(--transition), backdrop-filter var(--transition);
  border-bottom: 1px solid transparent;
}

.navbar.scrolled {
  background: color-mix(in srgb, var(--bg) 80%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: var(--border);
}

.nav-inner {
  max-width: 860px;
  width: 100%;
  margin: 0 auto;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-logo {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text);
  font-family: 'JetBrains Mono', monospace;
  flex-shrink: 0;
}

.dot { color: var(--accent); }

/* Desktop */
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  flex: 1;
}

.nav-link {
  font-size: 0.83rem;
  font-weight: 500;
  color: var(--text-muted);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  transition: all var(--transition);
}

.nav-link:hover, .nav-link.active { color: var(--text); background: var(--bg-card-hover); }
.nav-link.active { color: var(--accent-hover); }

.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.nav-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  transition: all var(--transition);
}

.nav-icon-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-glow);
}

/* Mobile */
.nav-mobile { display: none; }

.hamburger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--transition);
  flex-shrink: 0;
}

.hamburger:hover { border-color: var(--accent); color: var(--accent); }

.mobile-menu {
  display: flex;
  flex-direction: column;
  padding: 8px 16px 16px;
  border-top: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg) 95%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
  transition: color var(--transition);
}

.mobile-link:last-child { border-bottom: none; }
.mobile-link:hover, .mobile-link.active { color: var(--accent-hover); }

/* Transition */
.menu-enter-active, .menu-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.menu-enter-from, .menu-leave-to { opacity: 0; transform: translateY(-8px); }

@media (max-width: 600px) {
  .navbar { padding: 0 16px; }
  .nav-links { display: none; }
  .nav-actions { display: none; }
  .nav-mobile {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
  }
}
</style>
