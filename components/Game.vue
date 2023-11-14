<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { ScanResult } from 'qr-scanner-wechat'
import { view } from '~/logic/tview'
import type { State } from '~/logic/types'

const props = defineProps<{
  state: State
}>()

const state = computed(() => props.state.scanner)
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
  view.value = 'game'
}
</script>

<template>
  <div grid="~ cols-[38rem_1fr] gap-2" lt-lg="flex flex-col">
    <div flex="~ col gap-2">
      <div flex="~ col gap-3">
        <div flex="~ gap-3 justify-center" border="~ base rounded" min-h-50 p4 op75 transition hover:op95>
          <div flex="~ col gap-4" m-auto>
            <p>In what country did the first Starbucks open outside of North America?</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div flex="~ col gap-2" min-h-50>
        <button
          py2 text-sm text-button
        >
          <div i-ri-download-line />
          Download
        </button>

        <button
          py2 text-sm text-button
        >
          <div i-ri-download-line />
          Download
        </button>
      </div>
    </div>
  </div>
</template>
