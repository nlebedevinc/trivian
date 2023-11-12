export const view = ref<'generator' | 'compare' | 'credit' | 'verify' | 'camera'>('generator')

// @ts-expect-error back
if (view.value === 'scan')
  view.value = 'verify'

if (!['generator', 'compare', 'credit', 'verify', 'camera'].includes(view.value))
  view.value = 'generator'

// watchEffect(() => {
//   location.hash = view.value
// })
