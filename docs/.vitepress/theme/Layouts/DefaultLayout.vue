<template>
  <div class="mc:flex mc:flex-col mc:min-h-screen">
    <Navbar />

    <div class="mc:flex mc:flex-1">
      <!-- Sidebar -->
      <aside 
        :class="[
          'mc:fixed mc:top-21 mc:bottom-0 mc:left-0 mc:z-10', 
          'mc:hidden mc:w-75 mc:bg-stone-200 mc:p-4 mc:overflow-y-auto', 
          'mc:sm:block'
        ]"
      >
        <!-- Collapse/Expand All Button -->
        <div class="mc:flex mc:justify-end mc:mb-4">
          <button 
            class="mc:text-xs mc:font-medium mc:text-stone-600 mc:hover:text-stone-400"
            @click="toggleAll"
          >
            {{ allCollapsed ? 'Expand All' : 'Collapse All' }}
          </button>
        </div>

        <nav class="mc:flex mc:flex-col mc:gap-3 mc:h-[calc(100%-64px)] mc:overflow-y-auto">
          <div v-for="group in sidebarLinksData" :key="group.text">
            <!-- Group header -->
            <button
              class="mc:flex mc:items-center mc:justify-between mc:w-full mc:text-sm mc:font-bold mc:uppercase mc:text-stone-600 mc:mb-2"
              @click="toggleGroup(group.text)"
            >
              {{ group.text }}
              <span>{{ openGroups[group.text] ? '▾' : '▸' }}</span>
            </button>

            <!-- Group items -->
            <transition name="fade">
              <ul v-if="openGroups[group.text]" class="mc:flex mc:flex-col mc:gap-4 mc:mb-4 mc:ml-4">
                <li v-for="item in group.items" :key="item.link">
                  <!-- Item header -->
                  <button
                    v-if="item.items"
                    class="mc:flex mc:items-center mc:justify-between mc:w-full mc:text-base mc:font-medium mc:hover:text-stone-400"
                    @click="toggleGroup(item.link)"
                  >
                    {{ item.text }}
                    <span>{{ openGroups[item.link] ? '▾' : '▸' }}</span>
                  </button>
                  <a
                    v-else
                    :href="item.link"
                    class="mc:text-base mc:font-medium mc:hover:text-stone-400"
                  >
                    {{ item.text }}
                  </a>

                  <!-- Child items -->
                  <transition name="fade">
                    <ul v-if="openGroups[item.link]" class="mc:ml-6 mc:mt-1 mc:flex mc:flex-col mc:gap-1">
                      <li v-for="child in item.items" :key="child.link">
                        <!-- Child header -->
                        <button
                          v-if="child.items"
                          class="mc:flex mc:items-center mc:justify-between mc:w-full mc:text-sm mc:text-slate-700 mc:hover:text-stone-400 mc:pl-2"
                          @click="toggleGroup(child.link)"
                        >
                          {{ child.text }}
                          <span>{{ openGroups[child.link] ? '▾' : '▸' }}</span>
                        </button>
                        <a
                          v-else
                          :href="child.link"
                          class="mc:text-sm mc:text-slate-700 mc:hover:text-stone-400 mc:pl-2"
                        >
                          {{ child.text }}
                        </a>

                        <!-- Grandchildren -->
                        <transition name="fade">
                          <ul v-if="openGroups[child.link]" class="mc:ml-6 mc:mt-1 mc:flex mc:flex-col mc:gap-1">
                            <li v-for="grandchild in child.items" :key="grandchild.link">
                              <a 
                                :href="grandchild.link" 
                                class="mc:text-sm mc:text-slate-600 mc:hover:text-stone-400 mc:pl-4"
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

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useData, useRoute, Content } from 'vitepress'

import Navbar from '../Compoents/Navbar.vue'
import Footer from '../Compoents/Footer.vue'

const { theme } = useData()
const route = useRoute()

const openGroups = reactive<Record<string, boolean>>({})
const allCollapsed = ref(false)

function initGroups(groups: any[]) {
  groups.forEach(group => {
    openGroups[group.text] = true
    group.items?.forEach(item => {
      openGroups[item.link] = true
      item.items?.forEach(child => {
        openGroups[child.link] = true
      })
    })
  })
}

function toggleGroup(name: string) {
  openGroups[name] = !openGroups[name]
}

function toggleAll() {
  allCollapsed.value = !allCollapsed.value
  Object.keys(openGroups).forEach(key => {
    openGroups[key] = !allCollapsed.value
  })
}

const sidebarLinksData = computed(() => {
  const currentPath = route.path
  let groups = []
  if (currentPath.includes('/documentation/components/')) {
    groups = theme.value.sidebar['/documentation/components/']
  } else if (currentPath.includes('/documentation/guide/')) {
    groups = theme.value.sidebar['/documentation/guide/']
  }
  initGroups(groups)
  return groups
})
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
