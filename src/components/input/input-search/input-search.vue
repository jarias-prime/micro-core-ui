<template>
  <mc-input v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>

    <template #icon>
      <Icon icon="ph:magnifying-glass" />
    </template>
  </mc-input>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

import McInput from '@/components/input/input.vue';
</script>
