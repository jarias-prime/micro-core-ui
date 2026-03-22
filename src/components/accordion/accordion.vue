<template>
  <div
    id="accordion"
    :class="['bg-neutral-50', { 'rounded-border-radius-xl border-mushroom-200 border border-solid': props.bordered }]"
  >
    <template v-for="(item, index) in props.accordionItems" :key="item.collapseId">
      <div
        :id="`accordion_item_${item.collapseId}`"
        :class="{ 'border-mushroom-200 border-x-0 border-t border-b-0 border-solid': index !== 0 }"
      >
        <div
          id="header"
          :class="[
            'px-size-spacing-xs py-size-spacing-sm flex items-center justify-between',
            {
              'hover:cursor-pointer': props.accordionTrigger === 'header',
              'active:mc-background-color-pressed': clickedIndex === index && props.accordionTrigger === 'header',
              'rounded-t-border-radius-xl': clickedIndex === 0,
              'rounded-b-border-radius-xl': clickedIndex === props.accordionItems.length - 1 && !collapsedState[index],
            },
          ]"
          @mousedown="setClickedIndex(index)"
          @mouseup="clearIndex"
          @mouseleave="clearIndex"
          @click="props.accordionTrigger === 'header' && toggleCollapse(index)"
        >
          <div class="flex w-[95%] flex-col">
            <span class="text-mushroom-950 text-base leading-5 font-medium">{{ item.title }}</span>
            <span v-if="item.subtitle" class="text-mushroom-600 text-sm leading-5 font-normal">
              {{ item.subtitle }}
            </span>
          </div>
          <mc-button
            v-if="props.accordionTrigger === 'button'"
            variant="secondary"
            has-icon
            size="medium"
            class="!h-7 !w-7 !p-0"
            @click="toggleCollapse(index)"
          >
            <Icon :icon="collapsedState[index] ? 'ph:caret-up' : 'ph:caret-down'" width="16" height="16" />
          </mc-button>
          <Icon v-else :icon="collapsedState[index] ? 'ph:caret-up' : 'ph:caret-down'" width="16" height="16" />
        </div>
        <mc-collapsible v-model="collapsedState[index]">
          <div class="px-size-spacing-xs pb-size-spacing-sm text-mushroom-600">
            <slot :name="item.collapseId" />
          </div>
        </mc-collapsible>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

import { accordionPropTypes } from './accordion';
import { useAccordion } from './use-accordion';

import McCollapsible from '@/components/collapsible/collapsible.vue';
import McButton from '@/components/button/button.vue';

const props = defineProps(accordionPropTypes);

const { collapsedState, toggleCollapse, setClickedIndex, clearIndex, clickedIndex } = useAccordion(props);
</script>
