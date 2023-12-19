import type { TState, Question, Meta, Results } from './types'

const config = useAppConfig()

export function defaultResults(): Results {
  return {
    answers: [],
    time: 0,
    total: 0,
  }
}

export function defaultState(): TState {
  return {
    title: config.title as string,
    quiz: config.quiz as Question[],
    meta: config.meta as Meta,
    current: 0,
    results: defaultResults(),
  }
}
