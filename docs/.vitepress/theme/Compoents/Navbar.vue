<template>
  <nav
    :class="[
      'mc:fixed mc:top-0 mc:z-100',
      'mc:block mc:items-center mc:justify-between mc:h-auto mc:w-full mc:px-4 mc:py-4',
      'mc:sm:flex',
      {
        'mc:bg-transparent mc:text-slate-50': frontmatter.layout === 'Home',
        'mc:bg-slate-100 mc:text-black': frontmatter.layout !== 'Home',
      },
    ]"
  >
    <div :class="['mc:flex mc:gap-4 mc:items-center mc:justify-between', 'mc:sm:justify-start']">
      <a
        :class="['mc:grid mc:group mc:cursor-pointer', 'mc:transition-all mc:duration-300 mc:ease-in-out', 'mc:active:scale-98']"
        href="/"
      >
        <h1
          :class="[
            'mc:text-xl mc:font-bold', 
            'mc:transition-all mc:duration-300 mc:ease-in-out',
            'mc:group-hover:text-indigo-400'
          ]"
        >
          Micro Core UI
        </h1>
        <h5>v{{ packageJSON.version }}</h5>
      </a>
      <div class="mc:flex mc:gap-4 mc:items-center">
        <VPNavBarSearch />
        <Icon
          :class="[
            'mc:block mc:cursor-pointer mc:text-2xl',
            'mc:transition-all mc:duration-300 mc:ease-in-out',
            'mc:hover:text-indigo-400',
            'mc:active:scale-90',
            'mc:sm:hidden',
          ]"
          icon="line-md:menu"
          @click="mobileSidePanel = true"
        />
      </div>
    </div>
    <ul
      :class="[
        'mc:hidden mc:gap-3 mc:justify-center',
        'mc:sm:flex mc:sm:mt-0',
        {
          'mc:text-slate-50': frontmatter.layout === 'Home',
          'mc:text-black': frontmatter.layout !== 'Home',
        },
      ]"
    >
      <li>
        <a href="/documentation/guide/basics/installation.html" 
          :class="[
              'mc:text-base mc:font-medium', 
              'mc:transition-all mc:duration-300 mc:ease-in-out', 
              'mc:hover:text-indigo-400'
            ]"
          >
          Guides
        </a>
      </li>
      <li>
        <div class="mc:h-6 mc:w-px mc:bg-slate-200"></div>
      </li>
      <li>
        <a href="/documentation/components/accordion.html" 
          :class="[
              'mc:text-base mc:font-medium', 
              'mc:transition-all mc:duration-300 mc:ease-in-out', 
              'mc:hover:text-indigo-400'
            ]"
          >
          Components
        </a>
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
              'mc:hover:text-indigo-400',
              'mc:active:scale-90',
            ]"
            icon="cib:github"
          />
        </a>
      </li>
    </ul>
  </nav>

  <mc-sidepanel :is-open="mobileSidePanel" @close="mobileSidePanel = false" header-title="Documentations">
    <div class="mc:grid mc:gap-2">
      <a 
        :class="[
          'mc:flex mc:gap-4 mc:items-center mc:py-3 mc:px-4 mc:cursor-pointer',  
          'mc:transition-all mc:duration-300 mc:ease-in-out',
          'mc:hover:bg-indigo-100'
        ]" 
        href="/documentation/guide/basics/installation.html"
      >
        <Icon class="mc:cursor-pointer mc:text-2xl" icon="ep:guide" />
        <span>Guides</span>
      </a>
      <a 
        :class="[
          'mc:flex mc:gap-4 mc:items-center mc:py-3 mc:px-4 mc:cursor-pointer',  
          'mc:transition-all mc:duration-300 mc:ease-in-out',
          'mc:hover:bg-indigo-100'
        ]" 
        href="/documentation/components/accordion.html"
      >
        <Icon class="mc:cursor-pointer mc:text-lg" icon="fluent-mdl2:web-components" />
        <span>Components</span>
      </a>
    </div>
  </mc-sidepanel>
</template>

<script setup>
import { ref } from 'vue';
import { useData } from 'vitepress';

import { Icon } from '@iconify/vue';

import VPNavBarSearch from 'vitepress/dist/client/theme-default/components/VPNavBarSearch.vue';
import McSidepanel from '@/components/sidepanel/sidepanel.vue';

import packageJSON from '../../../../package.json';

const { frontmatter } = useData();

const mobileSidePanel = ref(false);
</script>
