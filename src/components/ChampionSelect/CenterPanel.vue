<script setup lang="ts">
import { computed } from 'vue'
import type { championSelectTeam } from '@bluebottle_gg/league-broadcast-client'
import { useClient } from '@/client'
import { handleImageError, handleImageLoad } from '@/utils/imageUtils'

const props = defineProps<{
  blueTeam: championSelectTeam
  redTeam: championSelectTeam
  bestOf: number
}>()

const client = useClient()
const cacheUrl = (path?: string) => client.getCacheUrl(path)

const dotCount = computed(() => (props.bestOf > 1 ? Math.floor(props.bestOf / 2) + 1 : 0))

function teamName(team: championSelectTeam, fallback: string): string {
  return team.metaData?.tag || team.metaData?.name || fallback
}

const sides = computed(() => [
  { key: 'blue' as const, team: props.blueTeam, name: teamName(props.blueTeam, 'BLUE') },
  { key: 'red' as const, team: props.redTeam, name: teamName(props.redTeam, 'RED') },
])

function dotFilled(team: championSelectTeam, i: number) {
  return (team.scoreMatch?.wins ?? 0) >= i
}
</script>

<template>
  <div class="center-panel">
    <div v-for="side in sides" :key="side.key" class="half" :class="side.key">
      <div v-if="dotCount" class="dots">
        <span
          v-for="i in dotCount"
          :key="i"
          class="dot"
          :class="{ filled: dotFilled(side.team, i) }"
        />
      </div>

      <div class="icon-wrap">
        <img
          v-if="side.team.metaData?.iconUri"
          class="team-icon"
          :src="cacheUrl(side.team.metaData.iconUri)"
          :alt="side.name"
          @error="handleImageError"
          @load="handleImageLoad"
        />
        <div v-else class="icon-fallback" />
      </div>

      <div class="name-block">
        <div class="team-name" :style="{ '--tn-len': side.name.length }">
          {{ side.name }}
        </div>
        <div v-if="side.team.metaData?.description" class="team-record">
          {{ side.team.metaData.description }}
        </div>
      </div>
    </div>

    <div class="brand-center" aria-label="Ryn eSports">
      <span>RYN</span>
      <small>ESPORTS</small>
    </div>
  </div>
</template>

<style scoped>
.center-panel {
  position: relative;
  display: flex;
  height: 100%;
  padding: 0 4px;
  background: rgb(4 6 10 / 0.9);
  border-radius: 6px 6px 0 0;
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.55);
}

.center-panel::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 2px;
  background: var(--broadcast-accent);
}

.half {
  width: 124px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 8px 8px;
}

.half.blue { order: 1; }
.half.red { order: 3; }

.brand-center {
  order: 2;
  align-self: center;
  width: 88px;
  height: 88px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-left: 1px solid rgb(255 255 255 / 0.12);
  border-right: 1px solid rgb(255 255 255 / 0.12);
  color: #fff;
}

.brand-center span {
  font-size: 27px;
  font-weight: 950;
  letter-spacing: 0.1em;
  line-height: 0.9;
  padding-left: 0.1em;
  text-shadow: 0 0 12px rgb(8 123 255 / 0.55);
}

.brand-center small {
  color: var(--broadcast-accent-bright);
  font-size: 7px;
  font-weight: 900;
  letter-spacing: 0.28em;
  padding-left: 0.28em;
}

.dots {
  display: flex;
  gap: 6px;
  align-items: center;
  height: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(120, 130, 145, 0.55);
  transform: scale(0.8);
  transition: transform 0.3s ease, background 0.3s ease;
}

.blue .dot.filled { background: var(--blue-team-color); transform: scale(1); }
.red .dot.filled { background: var(--red-team-color); transform: scale(1); }

.icon-wrap {
  position: relative;
  width: 100px;
  height: 100px;
  margin: auto 0;
}

.team-icon {
  position: absolute;
  inset: 0;
  margin: auto;
  max-width: 82%;
  max-height: 82%;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6));
}

.icon-fallback {
  position: absolute;
  inset: 10%;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 35%, rgba(30, 41, 59, 0.9), rgba(6, 9, 15, 0.95));
}

.name-block {
  position: absolute;
  bottom: 10px;
  width: calc(50% - 16px);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.half.blue .name-block { left: 12px; align-items: flex-start; text-align: left; }
.half.red .name-block { right: 12px; align-items: flex-end; text-align: right; }

.team-name {
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #fff;
  min-width: 116px;
  max-width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: clamp(14px, calc(230px / var(--tn-len, 8)), 24px);
}

.blue .team-name { color: color-mix(in oklch, var(--blue-team-color) 65%, #fff); }
.red .team-name { color: color-mix(in oklch, var(--red-team-color) 65%, #fff); }

.team-record {
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 1px;
  color: rgb(255 255 255 / 0.65);
  line-height: 1;
  width: 116px;
  text-align: center;
}
</style>
