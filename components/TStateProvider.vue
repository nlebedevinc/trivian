<script setup lang="ts">
import { view } from '~/logic/tview'
import { defaultState } from '~/logic/tstate'

import type { TState } from '~/logic/types'

defineProps<{
  index: number
}>()

// const state = useLocalStorage<State>(
//   `qrd-state-${storeIndex.value}`,
//   defaultState(),
//   {
//     mergeDefaults(storageValue, defaults) {
//       const result = { ...defaults, ...storageValue }
//       return result
//     },
//   },
// )

const state = ref<TState>(defaultState())

// eslint-disable-next-line no-console
console.log('State', state.value)
</script>

<template>
  <div flex="~ gap-2 items-center wrap">
    <button
      flex="~ gap-1.5 items-center" text-button
      :class="view === 'foreword' ? 'bg-secondary' : 'op50'"
      @click="view = 'foreword'"
    >
      <div i-ri-qr-code-line />
      Foreword
    </button>
    <button
      flex="~ gap-1.5 items-center" text-button
      :class="view === 'game' ? 'bg-secondary' : 'op50'"
      @click="view = 'game'"
    >
      <div i-ri-compasses-2-line />
      Game
    </button>
    <button
      flex="~ gap-1.5 items-center" text-button
      :class="view === 'conclusion' ? 'bg-secondary' : 'op50'"
      @click="view = 'conclusion'"
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
    </div> -->
    <div v-if="view === 'game' || view === 'conclusion'" flex="~ gap-1.5 items-center">
      <div flex="~ gap-1.5 items-center" ml2 text-sm>
        <div i-ri-github-fill />
        25
      </div>

      <div flex="~ gap-1.5 items-center" ml2 text-sm>
        <div i-ri-github-fill />
        1/25
      </div>

      <div flex="~ gap-1.5 items-center" ml2 text-sm>
        <div i-ri-github-fill />
        00:00
      </div>

      <div flex="~ gap-1.5 items-center" ml2 text-sm>
        <div i-ri-github-fill />
        Hint
      </div>
    </div>

    <button
      flex="~ gap-1.5 items-center" ml2 text-sm text-button
      :class="view === 'credit' ? 'bg-secondary' : 'op50'"
      @click="view = 'credit'"
    >
      Credits
    </button>
  </div>

  <div v-show="view === 'foreword'" w-full>
    <Foreword :state="state" />
  </div>

  <!-- should be number of points, then index of question, timer, hint  -->
  <div v-if="view === 'game'" w-full>
    <Game :state="state" />
  </div>

  <div v-if="view === 'conclusion'" w-full>
    <Conclusion :state="state" />
  </div>
</template>
