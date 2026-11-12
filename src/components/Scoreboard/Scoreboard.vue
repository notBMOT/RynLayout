<script setup lang="ts">
import { computed } from 'vue'
import { useIngameSelector } from '@/composables/useIngame'
import TeamRow from './TeamRow.vue'
import TeamObjectiveRow from './TeamObjectiveRow.vue'
import DragonBuffBanner from './DragonBuffBanner.vue'
import { GameState } from '@bluebottle_gg/league-broadcast-client'

const scoreboard = useIngameSelector((s) => s.gameData.scoreboard)
const players = useIngameSelector((s) => s.gameData.scoreboardBottom)
const isMocking = useIngameSelector((s) => (s.gameState as number) === GameState.Mocking)

const blue = computed(() => scoreboard.value?.teams[0])
const red = computed(() => scoreboard.value?.teams[1])

const bluePlayers = computed(() => players.value?.teams[0]?.players || [])
const redPlayers = computed(() => players.value?.teams[1]?.players || [])

const gameTime = computed(() => {
  if (!scoreboard.value) return '00:00'
  const minutes = Math.floor(scoreboard.value.gameTime / 60)
  const seconds = Math.floor(scoreboard.value.gameTime % 60)
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})
</script>

<template>
  <Transition name="scoreboard" :duration="{ enter: 850, leave: 750 }">
    <div v-if="scoreboard && blue && red" class="scoreboard">
      <div class="row-clip">
        <div class="top-row">
          <TeamRow
            style="grid-column: 1"
            :team="blue"
            :best-of="scoreboard.bestOf"
            :enemy-team-gold="red.gold"
          />
          <div class="center-brand" aria-label="Ryn eSports">
            <span class="brand-name">RYN</span>
            <span class="brand-subtitle">ESPORTS</span>
          </div>
          <TeamRow
            style="grid-column: 3"
            :team="red"
            :best-of="scoreboard.bestOf"
            :enemy-team-gold="blue.gold"
            mirror
          />
        </div>
      </div>
      <div class="row-clip">
        <div class="bottom-row">
          <TeamObjectiveRow :team="blue" :players="bluePlayers" :is-mocking="isMocking" />
          <p class="game-time">{{ gameTime }}</p>
          <TeamObjectiveRow :team="red" :players="redPlayers" mirror :is-mocking="isMocking" />
        </div>
      </div>
      <DragonBuffBanner />
    </div>
  </Transition>
</template>

<style scoped>
.scoreboard {
  width: 960px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.row-clip {
  overflow: hidden;
}

.scoreboard-enter-active .top-row {
  animation: row-slide-in 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.scoreboard-enter-active .bottom-row {
  animation: row-slide-in 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both;
}

.scoreboard-leave-active .top-row {
  animation: row-slide-out 0.35s cubic-bezier(0.55, 0, 0.75, 0.06) 0.35s both;
}

.scoreboard-leave-active .bottom-row {
  animation: row-slide-out 0.35s cubic-bezier(0.55, 0, 0.75, 0.06) both;
}

@keyframes row-slide-in {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}

@keyframes row-slide-out {
  from { transform: translateY(0); }
  to { transform: translateY(-100%); }
}

.top-row {
  height: 66px;
  background:
    linear-gradient(105deg, rgb(8 123 255 / 0.12), transparent 35%, transparent 65%, rgb(0 200 255 / 0.1)),
    var(--surface-strong);
  border-radius: var(--radius-lg);
  border: var(--brand-border-width) solid var(--border-color);
  box-shadow: var(--brand-glow), inset 0 1px 0 rgb(255 255 255 / 0.06);
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 92px minmax(0, 1fr);
  grid-template-rows: 66px;
}

.center-brand {
  grid-column: 2;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  position: relative;
  background: linear-gradient(180deg, rgb(8 123 255 / 0.16), rgb(7 10 16 / 0.9));
  border-left: 1px solid rgb(0 200 255 / 0.38);
  border-right: 1px solid rgb(0 200 255 / 0.38);
}

.center-brand::before,
.center-brand::after {
  content: '';
  position: absolute;
  width: 7px;
  height: 7px;
  background: var(--broadcast-accent-bright);
  box-shadow: 0 0 10px var(--broadcast-accent);
  transform: rotate(45deg);
}

.center-brand::before { top: 7px; }
.center-brand::after { bottom: 7px; }

.brand-name {
  color: #fff;
  font-family: 'Bebas Neue', system-ui, sans-serif;
  font-size: 31px;
  font-weight: 900;
  letter-spacing: 0.13em;
  line-height: 0.9;
  text-shadow: 0 0 14px rgb(8 123 255 / 0.75);
  padding-left: 0.13em;
}

.brand-subtitle {
  color: var(--broadcast-accent-bright);
  font-family: system-ui, sans-serif;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.34em;
  line-height: 1.5;
  padding-left: 0.34em;
}

.bottom-row {
  height: 34px;
  background: linear-gradient(90deg, rgb(8 123 255 / 0.11), var(--surface-soft) 28%, var(--surface-soft) 72%, rgb(0 200 255 / 0.09));
  border: 1px solid rgb(8 123 255 / 0.32);
  border-radius: var(--radius-md);
  box-sizing: border-box;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 92px minmax(0, 1fr);
  grid-template-rows: 32px;
}

.game-time {
  margin: 0;
  line-height: 1;
  color: #fff;
  font-size: 24px;
  font-weight: 800;
  justify-self: center;
  align-self: center;
  text-shadow: 0 0 12px rgb(8 123 255 / 0.65);
}
</style>
