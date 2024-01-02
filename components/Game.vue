<script setup lang="ts">
import { view } from '~/logic/tview'
import type { TState } from '~/logic/types'

const props = defineProps<{
  state: TState
}>()

const quiz = computed(() => props.state.quiz)
const current = computed(() => props.state.current)
const results = computed(() => props.state.results)
const lastAnswer = computed(() => {
  const { current, results } = props.state
  const { attempts } = results.answers[current]

  if (!attempts) {
    return ''
  }

  const { length } = attempts
  return attempts[length - 1]
})

onMounted(() => {
})

function next() {
  if (current.value < quiz.value.length - 1) {
    props.state.current++
  }
}

function prev() {
  if (current.value > 0) {
    props.state.current--
  }
}

function finish() {
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
  <div flex="~ col gap-3">
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
            flex="~ gap-1.5 items-center" text-button text-xl
            :class="current === 0 ? 'op50' : 'bg-secondary'"
            :disabled="current === 0"
            @click="prev"
          >
            <div i-ri-arrow-drop-left-line/>
          </button>

          <div flex-auto />

          <button
            v-if="current !== quiz.length - 1"
            flex="~ gap-1.5 items-center" text-button text-xl
            :class="current === quiz.length - 1 ? 'op50' : 'bg-secondary'"
            :disabled="current === quiz.length - 1"
            @click="next"
          >
            <div i-ri-arrow-drop-right-line />
          </button>
          <button
            v-if="current === quiz.length - 1"
            flex="~ gap-1.5 items-center" text-button
            :class="!isFinished ? 'op50' : 'bg-secondary'"
            :disabled="!isFinished"
            @click="finish"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
    <div>
      <div flex="~ col gap-2" min-h-50>
        <button
          v-for="opt in quiz[state.current].options" :key="opt"
          py2 text-sm text-button
          :disabled="isSubmitted"
          :style="{
            borderColor: calcAnswerStyle(opt),
          }"
          @click="() => response(opt)"
        >
          <!-- Change icon based on the answer -->
          <div i-ri-checkbox-blank-circle-line/>
          {{ opt }}
        </button>
      </div>
    </div>
  </div>
  <div v-if="calcAnswerStyle(lastAnswer) === 'green' && quiz[current].note" flex="~ gap-3" border="~ base rounded" p4 op75 transition hover:op95>
    <span i-ri-lightbulb-line flex-none text-lg text-yellow />
    <div flex="~ col gap-4">
      <p>
        {{ quiz[current].note }}
      </p>
      </div>
  </div>
  </div>
</template>
