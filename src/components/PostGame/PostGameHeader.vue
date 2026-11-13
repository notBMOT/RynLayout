<script setup lang="ts">
import { computed } from 'vue'
import { formatGameClock, type postGameOverview } from '@bluebottle_gg/league-broadcast-client'
import { useClient } from '@/client'
import { handleImageError, handleImageLoad } from '@/utils/imageUtils'
import { useEventBranding } from '@/composables/useEventBranding'

const props = defineProps<{
  overview: postGameOverview
  blueSide: number
  redSide: number
}>()

const client = useClient()
const { eventName } = useEventBranding()
const cacheUrl = (path?: string) => client.getCacheUrl(path)

const blueInfo = computed(() => props.overview.teamInfoBySide?.[props.blueSide])
const redInfo = computed(() => props.overview.teamInfoBySide?.[props.redSide])
const blueOverview = computed(() => props.overview.teamOverviewBySide?.[props.blueSide])
const redOverview = computed(() => props.overview.teamOverviewBySide?.[props.redSide])

const blueName = computed(
  () => blueOverview.value?.metaData?.name || blueInfo.value?.name || 'BLUE SIDE',
)
const redName = computed(
  () => redOverview.value?.metaData?.name || redInfo.value?.name || 'RED SIDE',
)
const blueTag = computed(
  () => blueOverview.value?.metaData?.tag || blueInfo.value?.tag || blueName.value,
)
const redTag = computed(
  () => redOverview.value?.metaData?.tag || redInfo.value?.tag || redName.value,
)
const blueIcon = computed(() => blueOverview.value?.metaData?.iconUri || blueInfo.value?.iconUri)
const redIcon = computed(() => redOverview.value?.metaData?.iconUri || redInfo.value?.iconUri)

const blueWon = computed(() => props.overview.winnerSide === props.blueSide)
const redWon = computed(() => props.overview.winnerSide === props.redSide)

const shortPatch = computed(() => props.overview.patch?.split('.').slice(0, 2).join('.'))
const clock = computed(() => formatGameClock(props.overview.gameTime))
</script>

<template>
  <div class="pg-header">
    <div class="bar">
      <!-- Blue side -->
      <div class="side side-blue">
        <div class="team-id">
          <span class="team-tag">{{ blueTag }}</span>
          <span class="team-name">{{ blueName }}</span>
        </div>
        <img
          v-if="blueIcon"
          class="team-logo"
          :src="cacheUrl(blueIcon)"
          :alt="blueName"
          @error="handleImageError"
          @load="handleImageLoad"
        />
        <div class="score-block">
          <span class="score" :class="{ win: blueWon }">{{ blueOverview?.kills ?? 0 }}</span>
          <span class="result" :class="{ win: blueWon }">{{ blueWon ? 'WIN' : 'LOSS' }}</span>
        </div>
      </div>

      <!-- Center clock -->
      <div class="clock-block">
        <span class="clock">{{ clock }}</span>
        <span class="clock-label">Gametime</span>
      </div>

      <!-- Red side -->
      <div class="side side-red">
        <div class="score-block">
          <span class="score" :class="{ win: redWon }">{{ redOverview?.kills ?? 0 }}</span>
          <span class="result" :class="{ win: redWon }">{{ redWon ? 'WIN' : 'LOSS' }}</span>
        </div>
        <img
          v-if="redIcon"
          class="team-logo"
          :src="cacheUrl(redIcon)"
          :alt="redName"
          @error="handleImageError"
          @load="handleImageLoad"
        />
        <div class="team-id align-right">
          <span class="team-tag">{{ redTag }}</span>
          <span class="team-name">{{ redName }}</span>
        </div>
      </div>
    </div>

    <!-- Event and project identity -->
    <div class="banner">
      <div class="ryn-lockup" aria-label="Ryn eSports">
        <span class="ryn-name">RYN</span>
        <span class="ryn-subtitle">ESPORTS</span>
      </div>
      <span class="banner-rule" />
      <span class="banner-text">{{ eventName || 'POST GAME' }}</span>
      <template v-if="shortPatch">
        <span class="banner-rule" />
        <span class="banner-text banner-patch">PATCH {{ shortPatch }}</span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.pg-header {
  display: flex;
  flex-direction: column;
  background: var(--surface-strong);
  border: var(--brand-border-width) solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.45);
}

.bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 32px;
  padding: 14px 40px;
}

/* ── Team side blocks ── */
.side {
  display: flex;
  align-items: center;
  gap: 24px;
  min-width: 0;
}
.side-red {
  justify-content: flex-end;
}

.team-id {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.team-id.align-right {
  align-items: flex-end;
  text-align: right;
}

.team-tag {
  font-size: 44px;
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: 0.02em;
  color: white;
  white-space: nowrap;
}

.team-name {
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.team-logo {
  width: 64px;
  height: 64px;
  object-fit: contain;
  flex-shrink: 0;
}

.score-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}

.score {
  font-size: 52px;
  font-weight: 900;
  line-height: 0.9;
  color: white;
}
.side-blue .score.win {
  color: var(--blue-team-color);
}
.side-red .score.win {
  color: var(--red-team-color);
}

.result {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}
.side-blue .result.win {
  color: var(--blue-team-color);
}
.side-red .result.win {
  color: var(--red-team-color);
}

/* ── Center clock ── */
.clock-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 0 20px;
}

.clock {
  font-size: 46px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.02em;
  color: white;
  font-variant-numeric: tabular-nums;
}

.clock-label {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}

/* ── Event banner ── */
.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 10px 24px;
  background: var(--surface-soft);
  border-top: 1px solid var(--border-color);
}

.ryn-lockup {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  min-width: 58px;
}

.ryn-name {
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.16em;
  line-height: 0.9;
  padding-left: 0.16em;
}

.ryn-subtitle {
  color: var(--broadcast-accent-bright);
  font-size: 7px;
  font-weight: 800;
  letter-spacing: 0.3em;
  padding-left: 0.3em;
}

.banner-rule {
  width: 1px;
  height: 22px;
  background: rgb(255 255 255 / 0.14);
}

.banner-text {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: white;
}

.banner-patch {
  font-weight: 700;
  color: var(--broadcast-accent-bright);
}
</style>
