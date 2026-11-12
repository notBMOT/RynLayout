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
const infoRotationInterval = 15000 // Rotate info every 15 seconds
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
  if (rotationTimer.value !== null) {
    clearInterval(rotationTimer.value)
  }
})
</script>

<template>
  <div class="flex flex-row justify-between items-center pl-2.5 pr-10 py-0.5 w-full h-full">
    <img :src="projectLogo" class="h-7 w-7 object-contain" alt="BlueBottle" />
    <div class="info-text-slot">
      <FadeTransition mode="out-in">
        <span :key="currentInfoIndex" class="patch-text">{{ currentInfo }}</span>
      </FadeTransition>
    </div>
  </div>
</template>

<style lang="css" scoped>
.ryn-mark {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  color: #f4f7fb;\n  font-size: 17px;\n  line-height: 1;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n}\n\n.ryn-mark i {\n  display: block;\n  width: 3px;\n  height: 15px;\n  background: #258dff;\n  transform: skew(-18deg);\n}\n\n.info-text-slot {
  display: grid;
  justify-items: end;
  align-items: center;
  overflow: hidden;
}

.patch-text {
  grid-area: 1 / 1;
  color: white;
  font-size: 17px;
  line-height: 1;
  font-weight: 800;
  font-weight: bold;
  white-space: nowrap;
}
</style>
