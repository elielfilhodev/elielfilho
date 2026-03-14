<template>
  <header class="header">
    <div class="container">
      <div class="hero">
        <div class="avatar-wrap" @mouseenter="hovered = true" @mouseleave="hovered = false" @click="lightbox = true">
          <svg class="avatar-ring" viewBox="0 0 120 120" :class="{ spinning: hovered }">
            <circle cx="60" cy="60" r="56" fill="none" stroke="url(#ringGrad)" stroke-width="2" stroke-dasharray="12 6" stroke-linecap="round"/>
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="var(--accent)" />
                <stop offset="100%" stop-color="var(--accent-hover)" stop-opacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
          <div class="avatar" :class="{ zoomed: hovered }">
            <img v-if="!imgFailed" :src="avatarSrc" alt="Eliel Filho" @error="onImgError" />
            <div class="avatar-fallback" v-else>EF</div>
          </div>
          <span class="status-dot" :title="t.available"></span>
        </div>

      <!-- Lightbox -->
      <Teleport to="body">
        <Transition name="lb">
          <div v-if="lightbox" class="lightbox" @click.self="lightbox = false">
            <button class="lb-close" @click="lightbox = false" aria-label="Fechar">
              <Icon name="ph:x-bold" size="20" />
            </button>
            <div class="lb-img-wrap">
              <img :src="avatarSrc" alt="Eliel Filho" class="lb-img" />
            </div>
          </div>
        </Transition>
      </Teleport>

        <h1 class="name">Eliel Filho</h1>
        <p class="role">
          <span class="typed">{{ typedText }}</span><span class="cursor" :class="{ blink: !isTyping }">|</span>
        </p>
        <p class="bio">{{ t.bio }}</p>

        <div class="cta-row">
          <a :href="t.cvFile" target="_blank" class="btn btn-primary" download>
            <Icon name="ph:file-text-bold" size="16" />
            {{ t.cv }}
          </a>
          <a :href="t.coverLetterFile" target="_blank" class="btn" download>
            <Icon name="ph:envelope-simple-bold" size="16" />
            {{ t.coverLetter }}
          </a>
          <a href="mailto:elielfilholk@gmail.com" class="btn btn-hire">
            <Icon name="ph:handshake-bold" size="16" />
            {{ t.hire }}
          </a>
        </div>

        <div class="socials">
          <a v-for="s in socials" :key="s.label" :href="s.url" target="_blank" :aria-label="s.label" class="social-link">
            <Icon :name="s.icon" size="20" />
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { t: tFull } = useI18n()
const t = computed(() => tFull.value.header)

const imgFailed = ref(false)
const avatarSrc = '/avatar.jpeg'
const onImgError = () => { imgFailed.value = true }
const hovered = ref(false)
const lightbox = ref(false)

onMounted(() => {
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') lightbox.value = false }
  window.addEventListener('keydown', onKey)
  onUnmounted(() => window.removeEventListener('keydown', onKey))
})

// Typing animation
const typedText = ref('')
const isTyping = ref(true)
let typingTimer: ReturnType<typeof setTimeout> | null = null
let roleIndex = 0

const clearTimer = () => { if (typingTimer) clearTimeout(typingTimer) }

const typeText = (text: string, onDone: () => void) => {
  let i = 0
  isTyping.value = true
  const tick = () => {
    if (i < text.length) {
      typedText.value += text[i++]
      typingTimer = setTimeout(tick, 65)
    } else {
      isTyping.value = false
      onDone()
    }
  }
  typingTimer = setTimeout(tick, 100)
}

const eraseText = (onDone: () => void) => {
  isTyping.value = true
  const tick = () => {
    if (typedText.value.length > 0) {
      typedText.value = typedText.value.slice(0, -1)
      typingTimer = setTimeout(tick, 35)
    } else {
      onDone()
    }
  }
  typingTimer = setTimeout(tick, 100)
}

const cycle = () => {
  const roles = t.value.roles
  typeText(roles[roleIndex]!, () => {
    typingTimer = setTimeout(() => {
      eraseText(() => {
        roleIndex = (roleIndex + 1) % roles.length
        cycle()
      })
    }, 2200)
  })
}

// restart cycle when language changes
watch(() => t.value.roles, () => {
  clearTimer()
  typedText.value = ''
  roleIndex = 0
  cycle()
})

onMounted(() => cycle())
onUnmounted(() => clearTimer())

const socials = [
  { label: 'GitHub', icon: 'ph:github-logo-bold', url: 'https://github.com/elielfilhodev' },
  { label: 'LinkedIn', icon: 'ph:linkedin-logo-bold', url: 'https://www.linkedin.com/in/eliel-filho-b1b8763b2/?locale=pt' },
  { label: 'Instagram', icon: 'ph:instagram-logo-bold', url: 'https://www.instagram.com/elielfilho.dev/' },
  { label: 'X / Twitter', icon: 'ph:x-logo-bold', url: 'https://x.com/hxssonyyy' },
  { label: 'Facebook', icon: 'ph:facebook-logo-bold', url: 'https://www.facebook.com/profile.php?id=61557818825555' },
]
</script>

<style scoped>
.header { padding: 48px 0 0; }

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 64px;
}

.avatar-wrap {
  position: relative;
  margin-bottom: 20px;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.avatar-ring {
  position: absolute;
  inset: 0;
  width: 120px;
  height: 120px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar-ring.spinning {
  opacity: 1;
  animation: spin 4s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  transform: translateZ(0) scale(1);
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  mask-image: radial-gradient(white, black);
  border: 2.5px solid var(--border);
  background: var(--bg-card);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 3px var(--bg), 0 0 0 5px var(--border);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
  position: relative;
  z-index: 1;
}

.avatar.zoomed {
  transform: translateZ(0) scale(1.12);
  box-shadow: 0 0 0 3px var(--bg), 0 0 0 5px var(--accent), 0 12px 32px rgba(99, 102, 241, 0.25);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  image-rendering: -webkit-optimize-contrast;
}

.avatar-fallback {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: -1px;
}

.status-dot {
  position: absolute;
  bottom: 6px;
  right: 6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid var(--bg);
  animation: pulse 2s infinite;
  z-index: 2;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
}

.name {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 4px;
}

.role {
  font-size: 0.9rem;
  color: var(--accent-hover);
  font-weight: 500;
  margin-bottom: 16px;
  font-family: 'JetBrains Mono', monospace;
  min-height: 1.4em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
}

.cursor {
  color: var(--accent);
  font-weight: 300;
  animation: none;
}

.cursor.blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.bio {
  max-width: 480px;
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 28px;
}

.cta-row {
  display: flex;
  gap: 12px;
  margin-bottom: 28px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-hire {
  background: transparent;
  border-color: var(--accent);
  color: var(--accent-hover);
}

.btn-hire:hover {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

.socials { display: flex; gap: 8px; }

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--border);
  color: var(--text-muted);
  transition: all var(--transition);
}

.social-link:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-glow);
  transform: translateY(-2px);
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lb-img-wrap {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.08);
  max-width: min(420px, 90vw);
  width: 100%;
}

.lb-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 16px;
}

.lb-close {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.08);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lb-close:hover {
  background: rgba(255,255,255,0.18);
  border-color: rgba(255,255,255,0.3);
}

/* Transition */
.lb-enter-active { animation: lb-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.lb-leave-active { animation: lb-out 0.2s ease forwards; }

@keyframes lb-in {
  from { opacity: 0; transform: scale(0.85); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes lb-out {
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(0.9); }
}
</style>
