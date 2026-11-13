<script setup lang="ts">
import { useEventBranding } from '@/composables/useEventBranding'

const { eventLogoUrl, eventName } = useEventBranding()
</script>

<template>
  <div class="brand-lockup" aria-label="Ryn eSports">
    <img
      v-if="eventLogoUrl"
      class="event-logo"
      :src="eventLogoUrl"
      :alt="eventName ? `${eventName} logo` : 'Event logo'"
    />
    <span v-if="eventLogoUrl" class="rule" />
    <div class="project-wordmark">
      <span class="project-name">RYN</span>
      <span class="project-subtitle">ESPORTS</span>
    </div>
  </div>
</template>

<style scoped>
.brand-lockup {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

/* Event marks stay event-supplied; the project mark is always plain text. */
.event-logo {
  height: 32px;
  max-width: 180px;
  width: auto;
  object-fit: contain;
}

.project-wordmark {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}

.project-name {
  color: #fff;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 0.16em;
  line-height: 0.9;
  padding-left: 0.16em;
}

.project-subtitle {
  color: var(--broadcast-accent-bright);
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.3em;
  padding-left: 0.3em;
}

.rule {
  width: 1px;
  height: 32px;
  background: rgb(255 255 255 / 0.16);
}
</style>
