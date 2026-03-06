<template>
  <div
    :class="[
      'mc-sticky mc-top-0 mc-z-30',
      'mc-flex mc-cursor-pointer mc-items-center mc-gap-size-spacing-5xs mc-bg-white-50 mc-px-size-spacing-xs mc-py-size-spacing-2xs',
      'mc-body-xs-regular',
      'mc-border-color-weak mc-border-0 mc-border-b mc-border-solid',
    ]"
    @click="handleBackClick"
  >
    <Icon icon="ph:arrow-left" class="mc-size-4" />
    <span>{{ props.label }}</span>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const props = defineProps({
  label: {
    type: String,
    default: 'Back',
  },
});

const emit = defineEmits({
  back: () => true,
});

const handleBackClick = () => {
  emit('back');
};
</script>
