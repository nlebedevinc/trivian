<!-- eslint-disable no-console -->
<script setup lang="ts">
import { view } from '~/logic/tview'
import type { TState } from '~/logic/types'

const props = defineProps<{
  state: TState
}>()

// const state = computed(() => props.state.scanner)
// const canvasPreview = ref<HTMLCanvasElement>()
// const canvasRect = ref<HTMLCanvasElement>()
// const result = ref<ScanResult>()
// const reading = ref(false)
// const loading = ref(true)
// const error = ref<any>()
// const controlling = ref(false)
// const triesCount = ref(0)

const title = computed(() => props.state.title)
const meta = computed(() => props.state.meta)

// in case we need to load something once component initializing
// like external request
onMounted(() => {
})

function start() {
  view.value = 'game'
}
</script>

<template>
  <div flex="~ col gap-3">
    <div flex="~ gap-3 justify-center" border="~ base rounded" p4>
      <!-- <span i-ri-folder-2-line flex-none text-lg text-yellow /> -->
      <div flex="~ col gap-4" text-lg>
        {{ title }}
      </div>
    </div>

    <div flex="~ gap-3" border="~ base rounded" p4 op75 transition hover:op95>
      <span i-ri-lightbulb-line flex-none text-lg text-yellow />
      <div flex="~ col gap-4">
        <p v-for="item in meta.intro">
          {{ item }}
        </p>
      </div>
    </div>
    <div flex="~ gap-3" border="~ base rounded" p4 op75 transition hover:op95>
      <span i-ri-pencil-ruler-2-line flex-none text-lg text-yellow />
      <div flex="~ col gap-4">
        <p>
          Don't know how to play? Don't worry, rules will be added soon.
        </p>
      </div>
    </div>
    <div v-for="tip in meta.tips" flex="~ gap-3" border="~ base rounded" p4 op75 transition hover:op95>
      <span i-ri-pencil-ruler-2-line flex-none text-lg text-yellow />
      <div flex="~ col gap-4">
        <p>
          {{ tip  }}
        </p>
      </div>
    </div>

    <div flex="~ gap-3" text-button @click="start">
      Start my game!
    </div>
  </div>
</template>
