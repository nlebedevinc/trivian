import { breakpointsTailwind } from "@vueuse/core"

export const storeIndex = useLocalStorage('qrd-state-index', 1, { listenToStorageChanges: false })

export const hasParentWindow = ref<boolean>(false)
export const showGridHelper = ref<boolean>(false)

export const isDark = useDark()
export const isLargeScreen = useBreakpoints(breakpointsTailwind).greater('lg')

export const toggleDark = useToggle(isDark)

export function defaultState(): object {
  return {}
}
