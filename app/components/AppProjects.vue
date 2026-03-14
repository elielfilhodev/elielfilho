<template>
  <section class="section" id="projects">
    <div class="container">
      <div class="section-header">
        <p class="section-title">{{ t.sections.projects }}</p>
        <div class="carousel-controls">
          <button class="ctrl-btn" @click="scrollBy(-1)" aria-label="Anterior">
            <Icon name="ph:arrow-left-bold" size="16" />
          </button>
          <button class="ctrl-btn" @click="scrollBy(1)" aria-label="Próximo">
            <Icon name="ph:arrow-right-bold" size="16" />
          </button>
        </div>
      </div>

      <div
        class="carousel-wrap"
        @mouseenter="stopAuto"
        @mouseleave="startAuto()"
      >
        <div
          ref="track"
          class="carousel-track"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
          @mouseleave="onMouseUp"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @scroll="onScroll"
          @click.capture="onClickCapture"
        >
          <article
            v-for="(project, i) in looped"
            :key="i"
            class="card project-card"
          >
            <div class="project-header">
              <h3 class="project-title">{{ project.title }}</h3>
              <div class="project-links">
                <a
                  v-if="project.repo"
                  :href="project.repo"
                  target="_blank"
                  aria-label="Repositório"
                  class="icon-link"
                >
                  <Icon name="ph:github-logo-bold" size="18" />
                </a>
                <a
                  v-if="project.url"
                  :href="project.url"
                  target="_blank"
                  aria-label="Ver projeto"
                  class="icon-link"
                >
                  <Icon name="ph:arrow-square-out-bold" size="18" />
                </a>
              </div>
            </div>
            <p class="project-desc">{{ project.description }}</p>
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const projects = await $fetch<any[]>('/api/projects')
const { track, looped, onMouseDown, onMouseMove, onMouseUp, onClickCapture, onTouchStart, onTouchMove, onScroll, scrollBy, startAuto, stopAuto } = useInfiniteCarousel(projects)

onMounted(() => startAuto())
</script>

<style scoped>
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.section-header .section-title { margin-bottom: 0; }

.carousel-controls { display: flex; gap: 8px; }

.ctrl-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--transition);
}

.ctrl-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-glow);
}

.carousel-wrap {
  overflow: hidden;
  margin: 0 -8px;
}

.carousel-track {
  display: flex;
  gap: 16px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  padding: 8px 8px 16px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  user-select: none;
}

.carousel-track::-webkit-scrollbar { display: none; }

.project-card {
  flex: 0 0 300px;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.project-title { font-size: 0.95rem; font-weight: 600; line-height: 1.4; }

.project-links { display: flex; gap: 6px; flex-shrink: 0; }

.icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  transition: all var(--transition);
}

.icon-link:hover { color: var(--accent); background: var(--accent-glow); }

.project-desc {
  font-size: 0.83rem;
  color: var(--text-muted);
  line-height: 1.6;
  flex: 1;
}

.project-tags { display: flex; flex-wrap: wrap; gap: 6px; }

@media (max-width: 600px) {
  .project-card { flex: 0 0 260px; }
}
</style>
