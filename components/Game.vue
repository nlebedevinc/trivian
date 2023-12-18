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
// // const result = ref<ScanResult>()
// const reading = ref(false)
// const loading = ref(true)
// const error = ref<any>()
// const controlling = ref(false)
// const triesCount = ref(0)

const quiz = computed(() => props.state.quiz)
const current = computed(() => props.state.current)
const results = computed(() => props.state.results)

onMounted(() => {
})

function next() {
  console.log("Next", props.state.current)
  if (current.value < quiz.value.length - 1) {
    // Object.assign(state, { current: state.value.current++ })
    props.state.current++
  }
}

function prev() {
  console.log("Prev", props.state.current)
  if (current.value > 0) {
    props.state.current--
  }
}

function finish() {
  console.log("Finish", props.state, isFinished)
  view.value = "conclusion"
}

function response(opt: string) {
  // in case if it doesn't exists
  if (!results.value.answers[current.value]) {
    // create new one and add it to the list on the user visit
    props.state.results.answers[current.value] = { attempts: [] }
  }

  props.state.results.answers[current.value].attempts.push(opt)
}

const isSubmitted = computed(() => {
  const result = results.value.answers[current.value]

  if (!result) {
    return false
  }

  const { answer }  = quiz.value[current.value]

  return result.attempts.includes(answer)
})

const isFinished = computed(() => {
  const { value: q } = quiz
  const { value: r } = results

  if (q.length > r.answers.length) {
    return false
  }

  for (let i = 0; i < q.length; i++) {
    const result = r.answers[i]

    if (!result) {
      return false
    }

    const { answer } = q[i]

    if (!result.attempts.includes(answer)) {
      return false
    }
  }

  return true
})


// should be computed value
function calcAnswerStyle(opt: string): string {
  if (!results.value.answers[current.value]) {
    // create new one and add it to the list on the user visit
    props.state.results.answers[current.value] = { attempts: [] }
  }

  if (!results.value.answers[current.value].attempts.includes(opt)) {
    return ''
  }

  if (quiz.value[current.value].answer === opt) {
    return 'green'
  }

  return 'red'
}
</script>

<template>
  <div grid="~ cols-[38rem_1fr] gap-2" lt-lg="flex flex-col">
    <div flex="~ col gap-2">
      <div flex="~ col gap-3">
        <div flex="~ gap-3 justify-center" border="~ base rounded" min-h-50 p4 op75 transition hover:op95>
          <div flex="~ col gap-4" m-auto>
            <p>{{ quiz[current].question }}</p>
          </div>
        </div>
        <div flex="~ gap-2 items-center wrap">
          <button
            flex="~ gap-1.5 items-center" text-button
            :class="current === 0 ? 'op50' : 'bg-secondary'"
            :disabled="current === 0"
            @click="prev"
          >
            <div i-ri-qr-code-line />
            Prev
          </button>

          <div flex-auto />

          <button
            v-if="current !== quiz.length - 1"
            flex="~ gap-1.5 items-center" text-button
            :class="current === quiz.length - 1 ? 'op50' : 'bg-secondary'"
            :disabled="current === quiz.length - 1"
            @click="next"
          >
            <div i-ri-qr-code-line />
            Next
          </button>
          <button
            v-if="current === quiz.length - 1"
            flex="~ gap-1.5 items-center" text-button
            :class="!isFinished ? 'op50' : 'bg-secondary'"
            :disabled="!isFinished"
            @click="finish"
          >
            <div i-ri-qr-code-line />
            Finish
          </button>
        </div>
      </div>
    </div>
    <div>
      <div  flex="~ col gap-2" min-h-50>
        <button
          v-for="opt in quiz[state.current].options" :key="opt"
          py2 text-sm text-button
          :disabled="isSubmitted"
          :style="{
            borderColor: calcAnswerStyle(opt),
          }"
          @click="() => response(opt)"
        >
          <div i-ri-download-line />
          {{ opt }}
        </button>
      </div>
    </div>
  </div>
</template>
