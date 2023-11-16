import { defineNuxtModule } from '@nuxt/kit'
import { game } from '../package.json'

export default defineNuxtModule({
  async setup(_, nuxt) {
    nuxt.options.appConfig.game = game
  },
})
