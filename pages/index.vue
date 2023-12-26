<script setup lang="ts">
import { hasParentWindow, storeIndex, toggleDark } from '~/logic/state'

const config = useRuntimeConfig()
const buildTime = useTimeAgo(config.public.buildTime as any)
</script>

<template>
  <nav flex="~ gap4 none" border="b base" relative z-10 p4 bg-base>
    <div flex-auto />
    <h1 pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-xl font-light tracking-2px>
      Trivian
    </h1>
    <div flex="~ gap-3 items-center">
      <a href="https://github.com/nlebedevinc/trivian" target="_blank" text-lg op50 hover:op100>
        <div i-ri-github-fill />
      </a>
      <!-- <a href="https://chat.antfu.me" target="_blank" text-lg op50 hover:op100>
        <div i-ri-linkedin-fill />
      </a> -->
      <button op50 hover:op100 @click="toggleDark()">
        <div i-ri-sun-fill dark:i-ri-moon-fill />
      </button>
    </div>
  </nav>
  <div flex="justify-center" p10 pb15 md:flex>
    <div flex="~ col gap-4" class="max-w-full min-h-[calc(100vh-100px)] w-250">
      <div fixed right-5 top-20 flex="col gap-2" hidden xl:flex>
        <VTooltip v-for="n in 10" :key="n" placement="left" distance="10">
          <button
            :style="{
              opacity: storeIndex === n ? 1 : 1 - (Math.abs(storeIndex - n) + 2) * 0.18,
              transform: storeIndex === n ? 'scale(1.1)' : 'scale(0.95)',
            }"
            class="hover:op100!"
            h-8 w-8 transition-all duration-300 icon-button @click="storeIndex = n"
          >
            {{ n }}
          </button>
          <template #popper>
            <div text-sm>
              Save slot {{ n }}
            </div>
          </template>
        </VTooltip>
      </div>

      <TStateProvider :key="storeIndex" :index="storeIndex" />

      <div flex-auto />

      <div mt-15 flex="~ col gap-2">
        <div>
          <span op50>Nikolay Lebedev's </span> <span font-600 op75>Trivian</span>
        </div>
        <div flex="~ gap-1 items-center">
          <span i-ri-arrow-right-line ml1 inline-block h-1em op50 /><a op75 hover:op100 href="#">What is Trivian?</a><br>
        </div>
        <div v-if="!hasParentWindow" flex="~ gap-1 items-center">
          <span i-ri-arrow-right-line ml1 inline-block h-1em op50 />
          <a
            href="#"
            flex="~ inline gap-1 items-center" op75 hover:op100
          >How to play?</a>
        </div>
        <div flex="~ gap-1 items-center">
          <span i-ri-arrow-right-line ml1 inline-block h-1em op50 />
          <a
            href="https://github.com/nlebedevinc/trivian/issues"
            target="_blank"
            flex="~ inline gap-1 items-center" op75 hover:op100
          >Bug report / feature request</a>
        </div>
      </div>
      <div>
        <span op50>If you find this app useful, </span>
        <a href="https://github.com/nlebedevinc" target="_blank" op75 hover:text-rose hover:underline hover:op100>Sponsor to support my work</a>
      </div>

      <div my2 h-1px border="t base" w-10 />

      <div flex="~ gap-2 items-center">
        <span op65>
          v{{ config.public.version }}
          <a text-xs font-mono op50 :href="`https://github.com/nlebedevinc/trivian/commit/${config.public.git.sha}`" target="_blank">({{ config.public.git.sha.slice(0, 5) }})</a>
        </span>
        <span op35>·</span>
        <span text-sm op50 :title="new Date(config.public.buildTime).toString()">Built {{ buildTime }}</span>
      </div>

      <div my4 h-1px border="t base" w-10 />

      <div flex="~ gap-3 items-center">
        <button op50 hover:op100 @click="toggleDark()">
          <div i-ri-sun-fill dark:i-ri-moon-fill />
        </button>
        <a href="https://github.com/nlebedevinc/trivian" target="_blank" text-lg op50 hover:op100>
          <div i-ri-github-fill />
        </a>
        <!-- <a href="https://chat.antfu.me" target="_blank" text-lg op50 hover:op100>
          <div i-ri-linkedin-fill />
        </a> -->
        <!-- <a href="https://antfu.me" target="_blank" ml--0.5 text-lg op50 hover:op100>
          <img src="https://antfu.me/logo.svg" h-1.2em w-1.2em dark:invert>
        </a> -->
        <div flex="~ gap-1 items-center" ml-3>
          <span op35>Made with </span><div text-red i-ri-heart-3-fill /><span op35> for </span><span font-bold op65>Tally</span><br>
        </div>
      </div>
    </div>
  </div>
</template>
