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
        :class="[
          'mc:grid mc:group mc:cursor-pointer',
          'mc:transition-all mc:duration-150 mc:ease-in-out',
          'mc:active:scale-98',
        ]"
        href="/"
      >
        <h1
          :class="[
            'mc:text-xl mc:font-bold',
            'mc:transition-all mc:duration-150 mc:ease-in-out',
            'mc:group-hover:text-indigo-400',
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
            'mc:transition-all mc:duration-150 mc:ease-in-out',
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
        <a
          href="/documentation/guide/basics/installation.html"
          :class="[
            'mc:text-base mc:font-medium',
            'mc:transition-all mc:duration-150 mc:ease-in-out',
            'mc:hover:text-indigo-400',
          ]"
        >
          Guides
        </a>
      </li>
      <li>
        <div class="mc:h-6 mc:w-px mc:bg-slate-200"></div>
      </li>
      <li>
        <a
          href="/documentation/components/accordion.html"
          :class="[
            'mc:text-base mc:font-medium',
            'mc:transition-all mc:duration-150 mc:ease-in-out',
            'mc:hover:text-indigo-400',
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
              'mc:transition-all mc:duration-150 mc:ease-in-out',
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
    <div class="mc:flex mc:justify-end mc:px-4 mc:pt-4 mc:pb-4">
      <mc-button variant="secondary" @click.stop="toggleAll">
        <span>{{ allCollapsed ? 'Expand All' : 'Collapse All' }}</span>
        <Icon icon="cuida:caret-right-outline" v-if="allCollapsed" />
        <Icon icon="cuida:caret-down-outline" v-else />
      </mc-button>
    </div>

    <nav class="mc:flex mc:flex-col mc:gap-3 mc:h-[calc(100%-150px)] mc:px-4 mc:overflow-y-auto">
      <div v-for="group in sidebarLinksData" :key="group.text">
        <!-- Group header -->
        <button
          :class="[
            'mc:flex mc:items-center mc:justify-between mc:gap-4 mc:w-full mc:p-2 mc:text-sm mc:font-bold mc:uppercase mc:cursor-pointer mc:rounded-lg',
            'mc:border mc:border-slate-200',
            'mc:transition-all mc:duration-150 mc:ease-in-out',
            'mc:hover:bg-stone-50 mc:hover:text-indigo-700',
          ]"
          @click.stop="toggleGroup(group.text)"
        >
          <span>{{ group.text }}</span>
          <Icon icon="cuida:caret-down-outline" v-if="openGroups[group.text]" />
          <Icon icon="cuida:caret-right-outline" v-else />
        </button>

        <!-- Group items -->
        <transition name="fade">
          <ul v-if="openGroups[group.text]" class="mc:flex mc:flex-col mc:mb-4">
            <li v-for="item in group.items" :key="item.link">
              <!-- Item header -->
              <template v-if="item.items">
                <button
                  :class="[
                    'mc:flex mc:items-center mc:gap-3 mc:w-full mc:p-2 mc:text-base mc:font-medium mc:text-stone-700 mc:cursor-pointer mc:rounded-lg',
                    'mc:transition-all mc:duration-150 mc:ease-in-out',
                    'mc:hover:bg-stone-50 mc:hover:text-indigo-700',
                  ]"
                  @click.stop="toggleGroup(item.link)"
                >
                  <span>{{ item.text }}</span>
                  <Icon icon="cuida:caret-down-outline" v-if="openGroups[item.link]" />
                  <Icon icon="cuida:caret-right-outline" v-else />
                </button>
              </template>
              <template v-else>
                <a
                  :class="[
                    'mc:block mc:w-full mc:p-2 mc:text-base mc:font-medium mc:rounded-lg',
                    'mc:transition-all mc:duration-150 mc:ease-in-out',
                    'mc:hover:bg-stone-50 mc:hover:text-indigo-700',
                    {
                      'mc:text-indigo-500': currentRoute.includes(item.link),
                      'mc:text-stone-700': !currentRoute.includes(item.link),
                    },
                  ]"
                  :href="item.link"
                  @click.stop="mobileSidePanel = false"
                >
                  {{ item.text }}
                </a>
              </template>

              <!-- Child items -->
              <transition name="fade">
                <ul
                  v-if="openGroups[item.link] && item.items && item.items.length > 0"
                  class="mc:mt-2 mc:flex mc:flex-col"
                >
                  <li v-for="child in item.items" :key="child.link">
                    <!-- Child header -->
                    <template v-if="child.items">
                      <button
                        :class="[
                          'mc:flex mc:items-center mc:gap-3 mc:w-full mc:pl-4 mc:pr-2 mc:py-2 mc:text-sm mc:font-medium mc:text-stone-500 mc:cursor-pointer mc:rounded-lg',
                          'mc:transition-all mc:duration-150 mc:ease-in-out',
                          'mc:hover:bg-stone-50 mc:hover:text-indigo-700',
                        ]"
                        @click.stop="toggleGroup(child.link)"
                      >
                        <span>{{ child.text }}</span>
                        <Icon icon="cuida:caret-down-outline" v-if="openGroups[child.link]" />
                        <Icon icon="cuida:caret-right-outline" v-else />
                      </button>
                    </template>
                    <template v-else>
                      <a
                        :class="[
                          'mc:block mc:w-full mc:pl-4 mc:pr-2 mc:py-2 mc:text-sm mc:font-medium mc:rounded-lg',
                          'mc:transition-all mc:duration-150 mc:ease-in-out',
                          'mc:hover:bg-stone-50 mc:hover:text-indigo-700',
                          {
                            'mc:text-indigo-500': currentRoute.includes(item.link),
                            'mc:text-stone-500': !currentRoute.includes(item.link),
                          },
                        ]"
                        :href="child.link"
                        @click.stop="mobileSidePanel = false"
                      >
                        {{ child.text }}
                      </a>
                    </template>

                    <!-- Grandchildren -->
                    <transition name="fade">
                      <ul
                        v-if="openGroups[child.link] && child.items && child.items.length > 0"
                        class="mc:mt-2 mc:flex mc:flex-col"
                      >
                        <li v-for="grandchild in child.items" :key="grandchild.link">
                          <a
                            :class="[
                              'mc:block mc:pl-8 mc:pr-2 mc:py-2 mc:text-sm mc:font-medium mc:rounded-lg',
                              'mc:transition-all mc:duration-150 mc:ease-in-out',
                              'mc:hover:bg-stone-50 mc:hover:text-indigo-700',
                              {
                                'mc:text-indigo-500': currentRoute.includes(item.link),
                                'mc:text-stone-500': !currentRoute.includes(item.link),
                              },
                            ]"
                            :href="grandchild.link"
                            @click.stop="mobileSidePanel = false"
                          >
                            {{ grandchild.text }}
                          </a>
                        </li>
                      </ul>
                    </transition>
                  </li>
                </ul>
              </transition>
            </li>
          </ul>
        </transition>
      </div>
    </nav>
  </mc-sidepanel>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { useData, useRoute, Content } from 'vitepress';

import { Icon } from '@iconify/vue';

import VPNavBarSearch from 'vitepress/dist/client/theme-default/components/VPNavBarSearch.vue';

import McSidepanel from '@/components/sidepanel/sidepanel.vue';
import McButton from '@/components/button/button.vue';

import packageJSON from '../../../../package.json';

const route = useRoute();
const { theme, frontmatter } = useData();

const mobileSidePanel = ref(false);

const currentRoute = computed(() => route.path);
const openGroups = reactive<Record<string, boolean>>({});
const allCollapsed = ref(false);

const initGroups = (groups: any[]) => {
  groups.forEach((group) => {
    openGroups[group.text] = true;
    group.items?.forEach((item: any) => {
      openGroups[item.link] = true;
      item.items?.forEach((child: any) => {
        openGroups[child.link] = true;
      });
    });
  });
};

const toggleGroup = (name: string) => {
  openGroups[name] = !openGroups[name];
};

const toggleAll = () => {
  allCollapsed.value = !allCollapsed.value;

  Object.keys(openGroups).forEach((key) => {
    openGroups[key] = !allCollapsed.value;
  });
};

const sidebarLinksData = computed(() => {
  let groups = theme.value.sidebar;

  // remap top-level keys to friendly names
  const remap: Record<string, string> = {
    '/documentation/components/': 'Components',
    '/documentation/guide/': 'Guide',
  };

  // transform groups into array with proper text
  const transformed = Object.entries(groups).map(([key, value]: [string, any]) => {
    return {
      text: remap[key] || key,
      items: value,
    };
  });

  initGroups(transformed);

  return transformed;
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
