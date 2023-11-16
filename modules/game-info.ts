import { defineNuxtModule } from '@nuxt/kit'
import { game } from '../package.json'

export default defineNuxtModule({
  setup(_, nuxt) {
    nuxt.options.appConfig.quiz = game.quiz
    nuxt.options.appConfig.meta = game.meta
    nuxt.options.appConfig.title = game.title
  },
})
