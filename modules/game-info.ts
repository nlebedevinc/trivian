import { defineNuxtModule } from '@nuxt/kit'
import { game } from '../package.json'

export default defineNuxtModule({
  setup(_, nuxt) {
    // fill data scrutures with identifiers
    nuxt.options.appConfig.quiz = game.quiz
    nuxt.options.appConfig.meta = game.meta
    nuxt.options.appConfig.title = game.title
  },
})
