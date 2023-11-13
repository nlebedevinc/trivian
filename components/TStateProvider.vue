<script setup lang="ts">
import { view } from '~/logic/view'
import { defaultState, storeIndex } from '~/logic/state'

import type { State } from '~/logic/types'

defineProps<{
  index: number
}>()

const state = useLocalStorage<State>(
  `qrd-state-${storeIndex.value}`,
  defaultState(),
  {
    mergeDefaults(storageValue, defaults) {
      const result = { ...defaults, ...storageValue }
      return result
    },
  },
)

// eslint-disable-next-line no-console
console.log('State', state.value)
</script>

<template>
  <div flex="~ gap-2 items-center wrap">
    <button
      flex="~ gap-1.5  items-center" text-button
      :class="view === 'generator' ? 'bg-secondary' : 'op50'"
      @click="view = 'generator'"
    >
      <div i-ri-qr-code-line />
      Foreword
    </button>
    <button
      flex="~ gap-1.5 items-center" text-button
      :class="view === 'compare' ? 'bg-secondary' : 'op50'"
      @click="view = 'compare'"
    >
      <div i-ri-compasses-2-line />
      Game
    </button>
    <button
      flex="~ gap-1.5 items-center" text-button
      :class="view === 'verify' ? 'bg-secondary' : 'op50'"
      @click="view = 'verify'"
    >
      <div i-ri-qr-scan-2-line />
      Conclusion
    </button>
    <!-- <button
      flex="~ gap-1.5 items-center" text-button
      :class="view === 'camera' ? 'bg-secondary' : 'op50'"
      @click="view = 'camera'"
    >
      <div i-ri-camera-line />
      Camera
    </button> -->
    <div flex-auto />
    <!-- <div>
      <a href="https://antfu.me" target="_blank" op75 hover:underline hover:op100>Anthony Fu</a><span op50>'s QR Toolkit</span>
    </div>
    <button
      flex="~ gap-1.5 items-center" ml2 text-sm text-button
      :class="view === 'credit' ? 'bg-secondary' : 'op50'"
      @click="view = 'credit'"
    >
      Credits
    </button> -->
  </div>
</template>
