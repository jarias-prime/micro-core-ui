<template>
  <mc-input
    v-bind="$attrs"
    :class="{ 'mc-cursor-pointer': $attrs.readonly === '' || $attrs.readonly === 'true' || $attrs.readonly }"
  >
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>

    <template #icon>
      <Icon icon="ph:caret-down" />
    </template>
  </mc-input>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

import McInput from '@/components/input/input.vue';
</script>
