<template>
  <div v-bind="id ? { id } : {}" :class="cardClasses.baseClasses" :style="{ borderWidth: props.borderWidth }">
    <div v-if="props.showHeader && ($slots.header || props.title)" :class="cardClasses.headerClasses">
      <div v-if="props.title" class="mc-flex mc-items-center">
        <Icon
          v-if="props.headerIcon"
          :icon="props.headerIcon"
          class="mc-me-size-spacing-3xs mc-h-6 mc-w-6 mc-text-kangkong-600"
        />
        <div class="mc-mr-size-spacing-3xs">
          <div class="mc-body-md-regular-medium mc-text-mushroom-950">
            {{ props.title }}
          </div>
          <div v-if="props.subtitle" class="mc-body-xs-regular mc-text-mushroom-600">
            {{ props.subtitle }}
          </div>
        </div>
      </div>
      <template v-if="$slots.header">
        <slot name="header" />
      </template>
    </div>

    <div v-if="$slots.content" :class="[cardClasses.contentPaddingSizeClasses, cardClasses.hasFlexBox]">
      <slot name="content" />
    </div>

    <slot />

    <div v-if="$slots.footer && $props.showFooter" :class="cardClasses.footerClasses">
      <slot name="footer" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSlots } from 'vue';
import { Icon } from '@iconify/vue';
import { cardPropTypes } from './card';
import { useCard } from './use-card';

const props = defineProps(cardPropTypes);
const slots = useSlots();

// Destructure id for template usage
const { id } = props;

const { cardClasses } = useCard(props, slots);
</script>
