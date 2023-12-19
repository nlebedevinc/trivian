<!-- eslint-disable no-console -->
<script setup lang="ts">

const props = defineProps<{
  modelValue: number
  active: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()

let interval: NodeJS.Timeout | undefined
const time = ref(props.modelValue)
const active = ref(props.active)

watch(() => props.active, (value) => {
  console.log(value)
  if (!value) {
    dispose()
  }
}, { immediate: true })

function run() {
  interval = active.value ? setInterval(() => {
    time.value++
    emit('update:modelValue', time.value)
  }, 1000) : undefined
}

function dispose() {
  clearInterval(interval)
}

function normalize(time: number): string {
  const minutes = Math.floor(time / 60).toString().padStart(2, '0')
  const seconds = Math.floor(time % 60).toString().padStart(2, '0')

  return `${minutes}:${seconds}`
}

onMounted(run)
onUnmounted(dispose)

</script>

<template>
  <div>
    <p>{{ normalize(time) }}</p>
  </div>
</template>
