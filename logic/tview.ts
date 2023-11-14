export const view = ref<'foreword' | 'game' | 'credit' | 'conclusion'>(location.hash.slice(1) as any || 'foreword')

// @ts-expect-error back
if (view.value === 'scan')
  view.value = 'conclusion'

if (!['foreword', 'game', 'credit', 'conclusion'].includes(view.value))
  view.value = 'foreword'

watchEffect(() => {
  location.hash = view.value
})
