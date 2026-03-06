<template>
  <div ref="tabContainer" class="mc-relative mc-flex">
    <div
      v-for="(tab, index) in list"
      :key="index"
      ref="tabElements"
      :class="[
        tabsClasses,
        {
          // Regular Tab
          'mc-rounded-l-md': !underlined && index === 0,
          'mc-rounded-r-md': !underlined && index === tabElements.length - 1,

          // Regular Tab - Active
          'mc-border-color-success-base mc-cursor-pointer !mc-border !mc-border-solid':
            !underlined && activeTab.index === index,

          // Regular Tab - Inactive
          'mc-border-color-weak hover:mc-background-color-hover mc-cursor-pointer !mc-border-x-[0.5px] !mc-border-y !mc-border-solid':
            !underlined && activeTab.index !== index,

          // Regular Tab - Disabled
          'mc-background-color-disabled !mc-cursor-not-allowed !mc-text-color-on-fill-disabled':
            !underlined && tab.disabled,

          // Underlined Tab - Active
          'mc-cursor-pointer': underlined && activeTab.index === index,

          // Underlined Tab - Inactive
          'mc-border-color-base mc-cursor-pointer !mc-border-b !mc-border-solid':
            underlined && activeTab.index !== index,
          'hover:mc-background-color-hover mc-cursor-pointer': underlined && activeTab.index !== index && !tab.disabled,

          // Underlined Tab - Disabled
          'mc-border-color-disabled mc-text-color-on-fill-disabled !mc-cursor-not-allowed mc-border-b':
            underlined && tab.disabled,
        },
      ]"
      @click="updateSelectedTabIndex(index, tab.disabled)"
    >
      <!-- Regular Tab Background Active Indicator -->
      <div
        v-if="!underlined && activeTab.index === index"
        :class="[
          'mc-background-color-single-active mc-tw-w-full mc-absolute mc-bottom-0 mc-left-0 mc-z-[5] mc-block mc-h-full mc-w-full mc-',
          {
            'mc-rounded-l-md': activeTab.index === 0,
            'mc-rounded-r-md': activeTab.index === tabElements.length - 1,
          },
        ]"
      />

      <div
        :class="{
          'mc-relative mc-z-[10] mc-flex mc-items-center mc-gap-size-spacing-5xs mc-leading-none': true,
          'mc-cursor-not-allowed': tab.disabled,
        }"
      >
        <div v-if="!!tab.icon">
          <Icon
            :class="{
              'mc-body-sm-regular': true,
              'mc-text-color-brand-base': activeTab.index === index,
            }"
            :icon="activeTab.index === index && typeof tab.iconFill === 'string' ? tab.iconFill : tab.icon"
          />
        </div>
        <div v-if="!!tab.label">
          {{ tab.label }}
        </div>
        <div v-if="props.showBadge" class="tab-badge mc-pl-size-spacing-5xs">
          <mc-badge v-if="!!tab.badge" :text="tab.badge.text" :variant="tab.badge.variant" :size="tab.badge.size" />
        </div>
      </div>
    </div>

    <!-- Underlined Tab Active Indicator -->
    <div
      v-if="underlined"
      :class="[
        'mc-background-color-success-base mc-absolute mc-bottom-0 mc-left-0 mc-z-10 mc-block mc-h-0.5 mc-rounded-full',
        'mc-transition-left mc-duration-150 mc-ease-in-out',
      ]"
      :style="{
        width: `${activeTab.width}px`,
        left: `${activeTab.underlineLeftOffset}px`,
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

import { tabsPropTypes, tabsEmitTypes } from './tabs';
import { useTabs } from './use-tabs';

import McBadge from '../badge/badge.vue';

const emit = defineEmits(tabsEmitTypes);
const props = defineProps(tabsPropTypes);

const { tabsClasses, activeTab, tabElements, tabContainer, updateSelectedTabIndex } = useTabs(props, emit);
</script>
