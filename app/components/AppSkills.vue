<template>
  <section class="section" id="skills" ref="sectionRef">
    <div class="container">
      <p class="section-title">{{ t.sections.skills }}</p>

      <!-- Category tabs -->
      <div class="tabs">
        <button
          v-for="group in skills"
          :key="group.key"
          class="tab"
          :class="{ active: activeTab === group.key }"
          @click="activeTab = group.key"
        >
          <Icon :name="group.icon" size="15" />
          {{ group.label }}
        </button>
      </div>

      <!-- Panels -->
      <div class="panels">
        <Transition name="fade" mode="out-in">
          <div :key="activeTab" class="panel">
            <div v-for="group in skills" :key="group.key" v-show="activeTab === group.key">

              <!-- Skill chips row -->
              <div class="skill-grid">
                <div
                  v-for="skill in group.items"
                  :key="skill.name"
                  class="skill-item"
                  @mouseenter="() => {}"
                  @mouseleave="() => {}"
                >
                  <img :src="skill.icon" :alt="skill.name" class="skill-icon" @error="onIconError" />
                  <span>{{ skill.name }}</span>
                </div>
              </div>

              <!-- Chart + Bars layout -->
              <div class="chart-layout">
                <!-- Radar -->
                <div class="radar-wrap">
                  <RadarChart
                    :items="group.items"
                    :color="group.color"
                    :visible="visible"
                    :size="280"
                  />
                </div>

                <!-- Progress bars -->
                <div class="bars">
                  <div v-for="skill in group.items" :key="skill.name + '-bar'" class="bar-row">
                    <div class="bar-meta">
                      <div class="bar-name">
                        <img :src="skill.icon" :alt="skill.name" class="bar-icon" @error="onIconError" />
                        <span>{{ skill.name }}</span>
                      </div>
                      <span class="bar-pct">{{ skill.level }}%</span>
                    </div>
                    <div class="bar-track">
                      <div
                        class="bar-fill"
                        :style="{ width: visible ? skill.level + '%' : '0%', background: group.color }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Transition>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const devicon = (n: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}/${n}-original.svg`
const deviconPlain = (n: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}/${n}-plain.svg`

const skills = [
  {
    key: 'frontend',
    label: 'Frontend',
    icon: 'ph:monitor-bold',
    color: 'linear-gradient(90deg, #6366f1, #818cf8)',
    items: [
      { name: 'HTML',       icon: devicon('html5'),          level: 95 },
      { name: 'CSS',        icon: devicon('css3'),           level: 90 },
      { name: 'JavaScript', icon: devicon('javascript'),     level: 88 },
      { name: 'TypeScript', icon: devicon('typescript'),     level: 80 },
      { name: 'Vue',        icon: devicon('vuejs'),          level: 80 },
      { name: 'Nuxt',       icon: deviconPlain('nuxtjs'),    level: 70 },
      { name: 'React',      icon: devicon('react'),          level: 80 },
      { name: 'Next.js',    icon: deviconPlain('nextjs'),    level: 90 },
      { name: 'Astro',      icon: 'https://astro.build/assets/press/astro-icon-light-gradient.svg', level: 65 },
      { name: 'Sass',       icon: devicon('sass'),           level: 60 },
      { name: 'Bootstrap',  icon: devicon('bootstrap'),      level: 60 },
    ],
  },
  {
    key: 'backend',
    label: 'Backend',
    icon: 'ph:terminal-window-bold',
    color: 'linear-gradient(90deg, #10b981, #34d399)',
    items: [
      { name: 'Node.js',      icon: devicon('nodejs'),       level: 80 },
      { name: 'Express',      icon: deviconPlain('express'), level: 76 },
      { name: 'Java',         icon: devicon('java'),         level: 50 },
      { name: 'Spring Boot',  icon: devicon('spring'),       level: 40 },
      { name: 'Python',       icon: devicon('python'),       level: 20 },
    ],
  },
  {
    key: 'databases',
    label: 'Databases',
    icon: 'ph:database-bold',
    color: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
    items: [
      { name: 'SQL Server',  icon: deviconPlain('microsoftsqlserver'), level: 70 },
      { name: 'PostgreSQL',  icon: devicon('postgresql'),              level: 70 },
      { name: 'MySQL',       icon: devicon('mysql'),                   level: 50 },
      { name: 'MongoDB',     icon: devicon('mongodb'),                 level: 20 },
    ],
  },
  {
    key: 'devops',
    label: 'DevOps',
    icon: 'ph:cloud-arrow-up-bold',
    color: 'linear-gradient(90deg, #ef4444, #f87171)',
    items: [
        { name: 'Linux',           icon: devicon('linux'),                 level: 80 },
        { name: 'Kali Linux',      icon: 'https://www.kali.org/images/kali-logo.svg', level: 60 },
      { name: 'Docker',          icon: devicon('docker'),                level: 50 },
      { name: 'Kubernetes',      icon: devicon('kubernetes'),            level: 20 },
      { name: 'GitHub Actions',  icon: deviconPlain('githubactions'),    level: 20 },
      
      
    ],
  },
]

const activeTab = ref('frontend')
const visible = ref(false)
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry?.isIntersecting) visible.value = true },
    { threshold: 0.15 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
  onUnmounted(() => observer.disconnect())
})

// re-trigger bars when tab changes
watch(activeTab, () => {
  visible.value = false
  nextTick(() => { visible.value = true })
})

const onIconError = (e: Event) => {
  (e.target as HTMLImageElement).style.display = 'none'
}
</script>

<style scoped>
/* Tabs */
.tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  font-size: 0.82rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all var(--transition);
}

.tab:hover { color: var(--text); border-color: var(--accent); }

.tab.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

/* Panel fade */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Chips */
.skill-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 13px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--bg-card);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text);
  transition: all var(--transition);
  cursor: default;
}

.skill-item:hover {
  border-color: var(--accent);
  background: var(--accent-glow);
  color: var(--accent-hover);
  transform: translateY(-2px);
}

.skill-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  flex-shrink: 0;
}

/* Chart + bars layout */
.chart-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 32px;
  align-items: center;
}

.radar-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 640px) {
  .chart-layout {
    grid-template-columns: 1fr;
  }
  .radar-wrap {
    order: -1;
  }
}

/* Progress bars */
.bars {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.bar-row { display: flex; flex-direction: column; }

.bar-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.bar-name {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text);
}

.bar-icon {
  width: 15px;
  height: 15px;
  object-fit: contain;
  flex-shrink: 0;
}

.bar-pct {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
}

.bar-track {
  height: 6px;
  border-radius: 100px;
  background: var(--border);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 100px;
  transition: width 0.9s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
