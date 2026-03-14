<template>
  <section class="section" id="books">
    <div class="container">
      <div class="section-header">
        <p class="section-title">{{ t.sections.books }}</p>
        <div class="carousel-controls">
          <button class="ctrl-btn" @click="scrollBy(-1, 200)" aria-label="Anterior">
            <Icon name="ph:arrow-left-bold" size="16" />
          </button>
          <button class="ctrl-btn" @click="scrollBy(1, 200)" aria-label="Próximo">
            <Icon name="ph:arrow-right-bold" size="16" />
          </button>
        </div>
      </div>

      <div
        class="carousel-wrap"
        @mouseenter="stopAuto"
        @mouseleave="startAuto(4000, 180)"
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
        >
          <a
            v-for="(book, i) in looped"
            :key="i"
            :href="book.url"
            target="_blank"
            class="book-card"
            @mousedown.stop
          >
            <div class="book-cover">
              <img :src="book.cover" :alt="book.title" loading="lazy" draggable="false" />
            </div>
            <div class="book-info">
              <p class="book-title">{{ book.title }}</p>
              <p class="book-author">{{ book.author }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const books = await $fetch<any[]>('/api/books')
const { track, looped, onMouseDown, onMouseMove, onMouseUp, onTouchStart, onTouchMove, onScroll, scrollBy, startAuto, stopAuto } = useInfiniteCarousel(books)

onMounted(() => startAuto(4000, 180))
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

.book-card {
  flex: 0 0 130px;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  transition: transform var(--transition);
  text-decoration: none;
}

.book-card:hover { transform: translateY(-4px); }
.book-card:hover .book-cover { border-color: var(--accent); }

.book-cover {
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid var(--border);
  aspect-ratio: 2/3;
  background: var(--bg-card);
  transition: border-color var(--transition);
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.book-title {
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text);
}

.book-author {
  font-size: 0.72rem;
  color: var(--text-muted);
}

@media (max-width: 600px) {
  .book-card { flex: 0 0 110px; }
}
</style>
