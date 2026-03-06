<template>
  <div
    ref="sliderRef"
    :class="[
      handleSliderSize,
      'mc-relative mc-w-full mc-rounded-lg mc-bg-white-100',
      props.disabled ? 'mc-cursor-not-allowed mc-opacity-50' : 'mc-cursor-pointer',
    ]"
    role="slider"
    :aria-valuenow="props.modelValue"
    :aria-valuemin="props.min"
    :aria-valuemax="props.max"
    :aria-disabled="props.disabled"
    tabindex="0"
    @pointerdown="startDrag"
  >
    <div
      :class="[
        handleSliderSize,
        'mc-absolute mc-left-0 mc-top-1/2 mc--translate-y-1/2 mc-rounded-lg mc-bg-kangkong-600',
        { 'mc-cursor-not-allowed': props.disabled },
      ]"
      :style="handleSliderStyle"
    ></div>

    <Icon
      icon="ph:circle-fill"
      :class="[
        handleSliderThumbSize,
        'mc-absolute mc-top-1/2 mc--translate-x-1/2 mc--translate-y-1/2 mc-transform mc-rounded-full mc-text-kangkong-600 hover:mc-text-kangkong-700 active:mc-border-2 active:mc-border-solid active:mc-text-kangkong-800',
        { 'mc-pointer-events-none mc-cursor-not-allowed': props.disabled },
      ]"
      :style="handleThumbStyle"
      @pointerdown="startDrag"
    />
  </div>
</template>

<script setup lang="ts">
import { useSlider } from './use-slider';
import { sliderPropTypes } from './slider';
import { Icon } from '@iconify/vue';

const props = defineProps(sliderPropTypes);
const emit = defineEmits(['update:modelValue', 'slideend']);

const { sliderRef, handleSliderSize, handleSliderThumbSize, startDrag, handleSliderStyle, handleThumbStyle } =
  useSlider(props, emit);
</script>
