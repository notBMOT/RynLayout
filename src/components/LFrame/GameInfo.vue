<script setup lang="ts">
import { useIngameSelector } from '@/composables/useIngame'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import FadeTransition from '../../transitions/FadeTransition.vue'
import { useClient } from '@/client'
import { useEventBranding } from '@/composables/useEventBranding'

const client = useClient()
const patch = useIngameSelector((s) => s.gameData.patch)
const shortPatch = computed(() => patch.value?.split('.').slice(0, 2).join('.') || '')
const { eventName } = useEventBranding()
const matchName = ref<string | null>(null)
const allInfo = computed(() => [
  ...(eventName.value ? [eventName.value] : ['LEAGUE BROADCAST']),
  ...(matchName.value ? [matchName.value] : []),
  `PATCH ${shortPatch.value}`,
])

const currentInfoIndex = ref(0)
const currentInfo = computed(() => allInfo.value[currentInfoIndex.value] ?? '')
const infoRotationInterval = 15000
const rotationTimer = ref<number | null>(null)

onMounted(async () => {
  rotationTimer.value = setInterval(() => {
    currentInfoIndex.value = (currentInfoIndex.value + 1) % allInfo.value.length
  }, infoRotationInterval)

  try {
    const match = await client.api.match.getCurrentMatch()
    matchName.value = match?.name?.trim() || null
  } catch {
    // No match configured on the backend — rotation just skips the match name.
  }
})

onUnmounted(() => {
  if (rotationTimer.value !== null) clearInterval(rotationTimer.value)
})
</script>

<template>
  <div class="game-info">
    <div class="ryn-mark" aria-label="Ryn eSports"><span>RYN</span><i></i></div>
    <div class="info-text-slot">
      <FadeTransition mode="out-in">
        <span :key="currentInfoIndex" class="patch-text">{{ currentInfo }}</span>
      </FadeTransition>
    </div>
  </div>
</template>

<style lang="css" scoped>
.game-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 12px;
  box-sizing: border-box;
}

.ryn-mark {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #f4f7fb;
  font-size: 17px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: 0.12em;
}

.ryn-mark i {
  display: block;
  width: 3px;
  height: 15px;
  background: #258dff;
  transform: skew(-18deg);
}

.info-text-slot {
  display: grid;
  justify-items: end;
  align-items: center;
  overflow: hidden;
}

.patch-text {
  grid-area: 1 / 1;
  color: #dce8f7;
  font-size: 17px;
  line-height: 1;
  font-weight: 800;
  letter-spacing: 0.04em;
  white-space: nowrap;
}
</style>
