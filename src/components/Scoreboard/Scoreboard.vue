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
  width: 920px;
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  height: 64px;
  background: var(--surface-strong);
  border: var(--brand-border-width) solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--brand-glow);
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 64px minmax(0, 1fr);
  grid-template-rows: 64px;
}

.center-brand {
  grid-column: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgb(8 123 255 / 0.13), transparent);
  border-left: 1px solid rgb(0 200 255 / 0.28);
  border-right: 1px solid rgb(0 200 255 / 0.28);
}

.brand-name {
  color: #fff;
  font-size: 25px;
  font-weight: 900;
  letter-spacing: 0.08em;
  line-height: 0.95;
  text-shadow: 0 1px 8px rgb(8 123 255 / 0.4);
  padding-left: 0.08em;
}

.brand-subtitle {
  color: var(--broadcast-accent-bright);
  font-family: system-ui, sans-serif;
  font-size: 7px;
  font-weight: 800;
  letter-spacing: 0.24em;
  line-height: 1.5;
  padding-left: 0.24em;
}

.bottom-row {
  height: 32px;
  background: var(--surface-soft);
  border: 1px solid rgb(8 123 255 / 0.3);
  border-radius: var(--radius-sm);
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 64px minmax(0, 1fr);
  grid-template-rows: 30px;
}

.game-time {
  margin: 0;
  line-height: 1;
  color: #fff;
  font-size: 21px;
  font-weight: 800;
  justify-self: center;
  align-self: center;
}
</style>
