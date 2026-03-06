<template>
  <div
    id="accordion"
    :class="{ 'mc-rounded-border-radius-xl mc-border mc-border-solid mc-border-mushroom-200': props.bordered }"
  >
    <template v-for="(item, index) in props.accordionItems" :key="item.collapseId">
      <div
        :id="`accordion_item_${item.collapseId}`"
        :class="{ 'mc-border-x-0 mc-border-b-0 mc-border-t mc-border-solid mc-border-mushroom-200': index !== 0 }"
      >
        <div
          id="header"
          :class="[
            'mc-flex mc-items-center mc-justify-between mc-px-size-spacing-xs mc-py-size-spacing-sm',
            {
              'hover:mc-cursor-pointer': props.accordionTrigger === 'header',
              'active:mc-background-color-pressed': clickedIndex === index && props.accordionTrigger === 'header',
              'mc-rounded-t-border-radius-xl': clickedIndex === 0,
              'mc-rounded-b-border-radius-xl':
                clickedIndex === props.accordionItems.length - 1 && !collapsedState[index],
            },
          ]"
          @mousedown="setClickedIndex(index)"
          @mouseup="clearIndex"
          @mouseleave="clearIndex"
          @click="props.accordionTrigger === 'header' && toggleCollapse(index)"
        >
          <div class="mc-flex mc-w-[95%] mc-flex-col">
            <span class="mc-text-base mc-font-medium mc-leading-5 mc-text-mushroom-950">{{ item.title }}</span>
            <span v-if="item.subtitle" class="mc-text-200 mc-font-normal mc-leading-5 mc-text-mushroom-600">{{
              item.subtitle
            }}</span>
          </div>
          <mc-button
            v-if="props.accordionTrigger === 'button'"
            variant="secondary"
            has-icon
            size="medium"
            class="!mc-h-7 !mc-w-7 !mc-p-0"
            @click="toggleCollapse(index)"
          >
            <Icon :icon="collapsedState[index] ? 'ph:caret-up' : 'ph:caret-down'" width="16" height="16" />
          </mc-button>
          <Icon v-else :icon="collapsedState[index] ? 'ph:caret-up' : 'ph:caret-down'" width="16" height="16" />
        </div>
        <mc-collapsible v-model="collapsedState[index]">
          <div class="mc-px-size-spacing-xs mc-pb-size-spacing-sm">
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
