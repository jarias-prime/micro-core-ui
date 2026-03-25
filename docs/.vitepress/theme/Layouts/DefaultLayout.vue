<template>
  <div class="mc:flex mc:flex-col mc:min-h-screen">
    <Navbar />

    <div class="mc:flex mc:flex-1">
      <!-- Sidebar -->
      <aside
        :class="[
          'mc:fixed mc:top-21 mc:bottom-0 mc:left-0 mc:z-10',
          'mc:hidden mc:w-75 mc:bg-stone-200 mc:overflow-y-auto',
          'mc:sm:block',
        ]"
      >
        <!-- Collapse / Expand -->
        <div class="mc:flex mc:justify-end mc:px-4 mc:pt-4 mc:pb-4">
          <mc-button variant="secondary" @click="toggleAll">
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
                'mc:flex mc:items-center mc:gap-4 mc:w-full mc:p-2 mc:text-sm mc:font-bold mc:uppercase mc:cursor-pointer mc:rounded-lg',
                'mc:transition-all mc:duration-150 mc:ease-in-out',
                'mc:hover:bg-stone-50 mc:hover:text-indigo-700',
              ]"
              @click="toggleGroup(group.text)"
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
                        'mc:flex mc:items-center mc:gap-3 mc:w-full mc:pl-4 mc:pr-2 mc:py-2 mc:text-base mc:font-medium mc:text-stone-700 mc:cursor-pointer mc:rounded-lg',
                        'mc:transition-all mc:duration-150 mc:ease-in-out',
                        'mc:hover:bg-stone-50 mc:hover:text-indigo-700',
                      ]"
                      @click="toggleGroup(item.link)"
                    >
                      <span>{{ item.text }}</span>
                      <Icon icon="cuida:caret-down-outline" v-if="openGroups[item.link]" />
                      <Icon icon="cuida:caret-right-outline" v-else />
                    </button>
                  </template>
                  <template v-else>
                    <a
                      :href="item.link"
                      :class="[
                        'mc:block mc:w-full mc:pl-4 mc:pr-2 mc:py-2 mc:text-base mc:font-medium mc:rounded-lg',
                        'mc:transition-all mc:duration-150 mc:ease-in-out',
                        'mc:hover:bg-stone-50 mc:hover:text-indigo-700',
                        {
                          'mc:text-indigo-500': currentRoute.includes(item.link),
                          'mc:text-stone-700': !currentRoute.includes(item.link),
                        },
                      ]"
                    >
                      {{ item.text }}
                    </a>
                  </template>

                  <!-- Child items -->
                  <transition name="fade">
                    <ul v-if="openGroups[item.link] && item.items && item.items.length > 0" class="mc:flex mc:flex-col">
                      <li v-for="child in item.items" :key="child.link">
                        <!-- Child header -->
                        <template v-if="child.items">
                          <button
                            :class="[
                              'mc:flex mc:items-center mc:gap-3 mc:w-full mc:pl-8 mc:pr-2 mc:py-2 mc:text-sm mc:font-medium mc:text-stone-500 mc:cursor-pointer mc:rounded-lg',
                              'mc:transition-all mc:duration-150 mc:ease-in-out',
                              'mc:hover:bg-stone-50 mc:hover:text-indigo-700',
                            ]"
                            @click="toggleGroup(child.link)"
                          >
                            <span>{{ child.text }}</span>
                            <Icon icon="cuida:caret-down-outline" v-if="openGroups[child.link]" />
                            <Icon icon="cuida:caret-right-outline" v-else />
                          </button>
                        </template>
                        <template v-else>
                          <a
                            :href="child.link"
                            :class="[
                              'mc:block mc:w-full mc:pl-8 mc:pr-2 mc:py-2 mc:text-sm mc:font-medium mc:rounded-lg',
                              'mc:transition-all mc:duration-150 mc:ease-in-out',
                              'mc:hover:bg-stone-50 mc:hover:text-indigo-700',
                              {
                                'mc:text-indigo-500': currentRoute.includes(item.link),
                                'mc:text-stone-500': !currentRoute.includes(item.link),
                              },
                            ]"
                          >
                            {{ child.text }}
                          </a>
                        </template>

                        <!-- Grandchildren -->
                        <transition name="fade">
                          <ul
                            v-if="openGroups[child.link] && child.items && child.items.length > 0"
                            class="mc:flex mc:flex-col"
                          >
                            <li v-for="grandchild in child.items" :key="grandchild.link">
                              <a
                                :href="grandchild.link"
                                :class="[
                                  'mc:block mc:pl-12 mc:pr-2 mc:py-2 mc:text-sm mc:font-medium mc:rounded-lg',
                                  'mc:transition-all mc:duration-150 mc:ease-in-out',
                                  'mc:hover:bg-stone-50 mc:hover:text-indigo-700',
                                  {
                                    'mc:text-indigo-500': currentRoute.includes(item.link),
                                    'mc:text-stone-500': !currentRoute.includes(item.link),
                                  },
                                ]"
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
      </aside>

      <!-- Main Content -->
      <main :class="['mc:flex-1 mc:mt-21 mc:bg-white mc:p-6 mc:ml-0', 'mc:sm:ml-75']">
        <Content />
      </main>
    </div>

    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { useData, useRoute, Content } from 'vitepress';

import { Icon } from '@iconify/vue';

import Navbar from '../Compoents/Navbar.vue';
import Footer from '../Compoents/Footer.vue';

import McButton from '@/components/button/button.vue';

const { theme } = useData();
const route = useRoute();

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
  let groups = [];

  if (currentRoute.value.includes('/documentation/system-modules/')) {
    groups = theme.value.sidebar['/documentation/system-modules/'];
  } else if (currentRoute.value.includes('/documentation/guide/')) {
    groups = theme.value.sidebar['/documentation/guide/'];
  }

  initGroups(groups);

  return groups;
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
