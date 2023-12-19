<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { ScanResult } from 'qr-scanner-wechat'
import { view } from '~/logic/tview'
import type { TState } from '~/logic/types'

const props = defineProps<{
  state: TState
  reset: () => void
}>()

const state = computed(() => props.state)
const canvasPreview = ref<HTMLCanvasElement>()
const canvasRect = ref<HTMLCanvasElement>()
const result = ref<ScanResult>()
const reading = ref(false)
const loading = ref(true)
const error = ref<any>()
const controlling = ref(false)
const triesCount = ref(0)

const dimension = ref<{
  upload?: {
    width: number
    height: number
  }
  preprocessed?: {
    width: number
    height: number
  }
  matched?: {
    width: number
    height: number
  }
}>({})

onMounted(() => {
  // ready()
  //   .then(() => {
  //     loading.value = false
  //     console.log('Scanner loaded')
  //   })
  //   .catch((e) => {
  //     error.value = e
  //     console.error(e)
  //   })
})

function start() {
  view.value = 'foreword'
  props.reset()
}
</script>

<template>
  <div flex="~ col gap-3">
    <div flex="~ gap-3 justify-center" border="~ base rounded" p4>
      <!-- <span i-ri-folder-2-line flex-none text-lg text-yellow /> -->
      <div flex="~ col gap-4" text-lg>
        Results
      </div>
    </div>

    <div grid="~ cols-[38rem_1fr] gap-2" lt-lg="flex flex-col-reverse">
      <div flex="~ col gap-2">
        <div border="~ base rounded" flex="~ gap-3" p4 op75 transition hover:op95>
          <span i-ri-goblet-fill flex-none text-lg text-yellow />
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
      </div>
      <div>
        <div border="~ base rounded" p3 pl6 pr0 flex="~ col gap-2">
          <div grid="~ gap-4 items-center">
            <div grid="~ gap-10 cols-2 items-center">
              <div text-sm op50>
                Total number of points scored
              </div>
              <div>
                {{ state.results.total }}
              </div>
            </div>

            <div grid="~ gap-10 cols-2 items-center">
              <div text-sm op50>
                Total number of questions answered
              </div>
              <div>
                {{ state.results.answers.length }}
              </div>
            </div>

            <div grid="~ gap-10 cols-2 items-center">
              <div text-sm op50>
                Total time taken
              </div>
              <div>
                {{ state.results.time }}
              </div>
            </div>
          </div>
        </div>
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
      Start over again
    </div>
  </div>
</template>
