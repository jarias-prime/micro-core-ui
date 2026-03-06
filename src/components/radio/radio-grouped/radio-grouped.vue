<template>
  <div :class="['mc-relative', { 'mc-w-full': props.choiceBox || props.fullWidth }]">
    <div :class="radioGroupedClasses.containerClasses">
      <mc-radio
        v-for="(option, index) in renderOptions()"
        :id="`${props.id}-${index}`"
        :key="`${props.id}-option-${index}`"
        v-model="proxyValue"
        :name="props.name"
        :value="option.value"
        :disabled="isOptionDisabled(option)"
        :choice-box="props.choiceBox"
        :full-width="props.fullWidth || props.choiceBox"
        :description="option.description"
      >
        <span :class="getOptionLabelClasses(option, proxyValue)">
          {{ option.text }}
        </span>
      </mc-radio>
    </div>

    <div v-if="props.displayHelper" :class="radioGroupedClasses.helperClasses">
      <slot name="helperMessage">
        <Icon v-if="props.helperIcon" class="mc-h-5 mc-min-h-5 mc-w-5 mc-min-w-5" :icon="props.helperIcon" />
        <span>{{ props.helperText }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import McRadio from '@/components/radio/radio.vue';

import { radioGroupedPropTypes, radioGroupedEmitTypes } from './radio-grouped';
import { useRadioGrouped } from './use-radio-grouped';

const props = defineProps(radioGroupedPropTypes);
const emit = defineEmits(radioGroupedEmitTypes);

const { radioGroupedClasses, proxyValue, renderOptions, isOptionDisabled, getOptionLabelClasses } = useRadioGrouped(
  props,
  emit,
);
</script>
