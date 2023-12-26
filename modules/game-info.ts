import { defineNuxtModule } from '@nuxt/kit'
import { quiz, meta, title } from '../trivian.config.json'

export default defineNuxtModule({
  setup(_, nuxt) {
    // fill data scrutures with identifiers
    nuxt.options.appConfig.quiz = quiz
    nuxt.options.appConfig.meta = meta
    nuxt.options.appConfig.title = title
  },
})
