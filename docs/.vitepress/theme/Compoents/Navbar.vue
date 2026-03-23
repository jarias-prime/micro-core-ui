<template>
  <nav
    :class="[
      'mc:fixed mc:top-0 mc:z-10',
      'mc:block mc:items-center mc:justify-between mc:h-auto mc:w-full mc:px-6 mc:py-8',
      'mc:sm:flex mc:sm:h-16 mc:sm:px-8 mc:sm:py-12',
      {
        'mc:bg-transparent mc:text-slate-50': frontmatter.layout === 'Home',
        'mc:bg-slate-100 mc:text-black': frontmatter.layout !== 'Home',
      },
    ]"
  >
    <div :class="['mc:flex mc:gap-8 mc:items-center mc:justify-between', 'mc:sm:justify-start']">
      <a
        :class="['mc:grid mc:cursor-pointer', 'mc:transition-all mc:duration-300 mc:ease-in-out', 'mc:active:scale-98']"
        href="/"
      >
        <h1 class="mc:text-xl mc:font-bold">Micro Core UI</h1>
        <h5>v{{ packageJSON.version }}</h5>
      </a>
      <VPNavBarSearch />
    </div>
    <ul
      :class="[
        'mc:flex mc:gap-6 mc:justify-center mc:mt-8',
        'mc:sm:mt-0',
        {
          'mc:text-slate-50': frontmatter.layout === 'Home',
          'mc:text-black': frontmatter.layout !== 'Home',
        },
      ]"
    >
      <li>
        <a href="/components" class="mc:text-lg">Components</a>
      </li>
      <li>
        <div class="mc:h-6 mc:w-px mc:bg-slate-200"></div>
      </li>
      <li>
        <a href="/guides" class="mc:text-lg">Guides</a>
      </li>
      <li>
        <div class="mc:h-6 mc:w-px mc:bg-slate-200"></div>
      </li>
      <li class="mc:flex mc:items-center">
        <a href="https://github.com/jarias-prime/micro-core-ui" target="_blank" rel="noopener noreferrer">
          <Icon
            :class="[
              'mc:cursor-pointer mc:text-2xl',
              'mc:transition-all mc:duration-300 mc:ease-in-out',
              'mc:active:scale-90',
            ]"
            icon="cib:github"
          />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useData } from 'vitepress';

import { Icon } from '@iconify/vue';

import VPNavBarSearch from 'vitepress/dist/client/theme-default/components/VPNavBarSearch.vue';

import packageJSON from '../../../../package.json';

const { frontmatter } = useData();
</script>
