---
layout: Home
---

<div class="mc:h-[calc(100vh-64px)] mc:bg-radial-[at_50%_-100%] mc:from-sky-200 mc:via-blue-950 mc:to-black mc:to-100% mc:overflow-hidden">
  <div id='stars'></div>
  <div id='stars2'></div>
  <div id='stars3'></div>

  <div :class="['mc:flex mc:flex-col mc:gap-20 mc:items-center mc:justify-center mc:p-6', 'mc:h-full mc:max-w-[50em] mc:m-auto mc:text-center']">
    <div class="mc:grid mc:gap-8">
      <div class="mc:grid mc:gap-2">
        <h1 class="mc:text-slate-50 mc:leading-tight mc:font-bold mc-font-size-800 sm:mc-font-size-600 md:mc-font-size-900 lg:mc-font-size-1000">
          Micro Core UI
        </h1>
        <p class="mc:text-slate-50 mc:leading-snug mc-font-size-500 sm:mc-font-size-500 md:mc-font-size-700">
          "Design once. Reuse everywhere"
        </p>
      </div>
      <div class="mc:flex mc:justify-center mc:gap-4">
        <a :class="[
            'mc:flex mc:gap-2 mc:items-center', 
            'mc:p-2 mc:cursor-pointer mc:rounded-full mc:bg-slate-200', 
            'mc:transition-all mc:duration-150 mc:ease-in-out',
            'mc:hover:bg-indigo-200',
            'mc:active:scale-90'
          ]"
          href="https://tailwindcss.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          v-for="(technology, index) in technologies"
          :key="index"
        >
           <Icon
            :class="[
              'mc:cursor-pointer mc:text-2xl',
              'mc:transition-all mc:duration-150 mc:ease-in-out',
              'mc:active:scale-90',
            ]"
            :icon="technology.icon"
          />
          <span class="mc:font-semibold">{{ technology.version }}</span>
        </a>
      </div>
    </div>
    <p class="mc:text-slate-400">
      Micro Core UI is a Vue 3 component library built with Vite and Tailwind CSS that provides reusable, customizable UI components to help teams build consistent and modern interfaces faster.
    </p>
  </div>
</div>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue'; 

import packageJSON from '../package.json'; 

const technologies = ref([
  {
    icon: 'devicon:vuejs',
    link: 'https://vuejs.org/',
    version: `v${packageJSON.dependencies.vue.replace(/^\^/, '')}`
  },
  {
    icon: 'devicon:vitejs',
    link: 'https://vite.dev/',
    version: `v${packageJSON.devDependencies.vite.replace(/^\^/, '')}`
  },
  {
    icon: 'devicon:tailwindcss',
    link: 'https://tailwindcss.com/',
    version: `v${packageJSON.dependencies.tailwindcss.replace(/^\^/, '')}`
  }
]);
</script>
