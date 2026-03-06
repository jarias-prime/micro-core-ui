<template>
  <mc-input v-bind="props" :type="evaluatePasswordInputType" @update:model-value="emit('update:modelValue', $event)">
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>

    <template #icon>
      <Icon
        :icon="evaluateEyeIcon"
        :class="['mc-cursor-pointer mc-transition mc-duration-150 mc-ease-in-out', 'hover:mc-text-color-base']"
        @click="showPassword = !showPassword"
      />
    </template>
  </mc-input>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

import McInput from '@/components/input/input.vue';
import { inputPropTypes, inputEmitTypes } from '@/components/input/input';

import { useInputPassword } from './use-input-password';

const emit = defineEmits(inputEmitTypes);
const props = defineProps(inputPropTypes);

const { showPassword, evaluateEyeIcon, evaluatePasswordInputType } = useInputPassword();
</script>
