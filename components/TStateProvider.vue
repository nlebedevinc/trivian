<script setup lang="ts">
import { view } from '~/logic/tview'
import { defaultState, defaultResults } from '~/logic/tstate'

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
</script>

<template>
  <div flex="~ gap-2 items-center wrap">
    <button
      flex="~ gap-1.5 items-center" text-button
      :class="view === 'foreword' ? 'bg-secondary' : 'op50'"
      :disabled="view === 'conclusion'"
      @click="view = 'foreword'"
    >
      <div i-ri-graduation-cap-line />
      Intro
    </button>
    <button
      flex="~ gap-1.5 items-center" text-button
      :class="view === 'game' ? 'bg-secondary' : 'op50'"
      :disabled="view === 'conclusion'"
      @click="view = 'game'"
    >
      <div i-ri-billiards-fill />
      Game
    </button>
    <button
      flex="~ gap-1.5 items-center" text-button
      :class="view === 'conclusion' ? 'bg-secondary' : 'op50'"
      :disabled="view === 'foreword' || view === 'game'"
      @click="view = 'conclusion'"
    >
      <div i-ri-medal-line />
      Results
    </button>
    <div flex-auto />
    <!-- <div>
      <a href="https://antfu.me" target="_blank" op75 hover:underline hover:op100>Anthony Fu</a><span op50>'s QR Toolkit</span>
    </div> -->
    <div v-if="view === 'game' || view === 'conclusion'" flex="~ gap-1.5 items-center">
      <div flex="~ gap-1.5 items-center" ml2 text-sm>
        <div i-ri-star-s-line/>
        25
      </div>

      <div flex="~ gap-1.5 items-center" ml2 text-sm>
        <div i-ri-walk-fill />
        {{ `${state.current + 1}/${state.quiz.length}` }}
      </div>

      <div flex="~ gap-1.5 items-center" ml2 text-sm>
        <div i-ri-time-line/>
        <Timer
          v-model="state.results.time"
          :active="view === 'game'"
        />
      </div>
    </div>

    <button
      flex="~ gap-1.5 items-center" ml2 text-sm text-button
      :class="view === 'credit' ? 'bg-secondary' : 'op50'"
      :disabled="true"
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
    <Conclusion :state="state" :reset="() => {
      state.results = defaultResults()
      state.current = 0
    } " />
  </div>
</template>
