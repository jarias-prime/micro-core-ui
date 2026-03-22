<template>
  <nav
    :class="[
      'mc:fixed mc:top-0 mc:z-10',
      'mc:h-16 mc:px-8 mc:py-12 mc:flex mc:items-center mc:justify-between mc:w-full',
      {
        'mc:bg-transparent mc:text-slate-50': frontmatter.layout === 'Home',
        'mc:bg-slate-100 mc:text-black': frontmatter.layout !== 'Home',
      },
    ]"
  >
    <div class="mc:flex mc:gap-8 mc:items-center">
      <a
        :class="['mc:grid mc:cursor-pointer', 'mc:transition-all mc:duration-300 mc:ease-in-out', 'mc:active:scale-98']"
        href="/"
      >
        <h1 class="mc:text-xl mc:font-bold">Micro Core UI</h1>
        <h5>v{{ packageJSON.version }}</h5>
      </a>
      <VPNavBarSearch />
    </div>
    <ul class="mc:flex mc:space-x-6">
      <li>
        <a href="/components" class="mc:text-lg">Components</a>
      </li>
      <li>
        <a href="/guides" class="mc:text-lg">Guides</a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import VPNavBarSearch from 'vitepress/dist/client/theme-default/components/VPNavBarSearch.vue';

import { useData } from 'vitepress';

import packageJSON from '../../../../package.json';

const { frontmatter } = useData();
</script>
