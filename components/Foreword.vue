<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { ScanResult } from 'qr-scanner-wechat'
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
  <SafariWarning />
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
        <p>
          Try adjusting the preprocessing options to get the best result.
        </p>
        <p>
          This scanner uses the algorithm open sourced by WeChat, based on OpenCV.
          It uses two CNN-based models and provides much better recognizability than average scanners.
        </p>
        <p>
          The detection and decoding is done completely local in your browser.
          This is made possible by compiling OpenCV with the WeChat's scanner into WebAssembly.
          If you are interested in learning more, check out <a href="https://github.com/antfu/qr-scanner-wechat" target="_blank" font-mono op75 hover:underline hover:op100>qr-scanner-wechat</a>.
        </p>
      </div>
    </div>
    <div flex="~ gap-3" border="~ base rounded" p4 op75 transition hover:op95>
      <span i-ri-folder-2-line flex-none text-lg text-yellow />
      <div flex="~ col gap-4">
        <p>
          Have a lot images to verify? Try <a href="https://github.com/antfu/qr-verify-cli" target="_blank" font-mono op75 hover:underline hover:op100>qr-verify</a> to do so in batch!
        </p>
      </div>
    </div>

    <div flex="~ gap-3" text-button @click="start">
      Start my game!
    </div>
  </div>
</template>
