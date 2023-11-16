import type { TState, Question, Meta } from './types'

const config = useAppConfig()

export function defaultState(): TState {
  return {
    title: config.title as string,
    quiz: config.quiz as Question[],
    meta: config.meta as Meta,
    current: 0,
  }
}
