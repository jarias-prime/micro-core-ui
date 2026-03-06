<template>
  <div
    :class="containerClasses"
    :aria-valuemin="0"
    :aria-valuemax="props.max || 100"
    :aria-valuenow="props.value"
    role="progressbar"
  >
    <div
      :class="[
        handleProgressBarSize,
        'mc-overflow-hidden mc-rounded-lg mc-bg-white-100',
        {
          'mc-w-full': [
            'top',
            'top-start',
            'top-center',
            'top-end',
            'bottom',
            'bottom-start',
            'bottom-center',
            'bottom-end',
          ].includes(props.labelPlacement),
          'mc-flex-1': ['left', 'right'].includes(props.labelPlacement),
        },
      ]"
    >
      <div
        :class="[`mc-background-color-${validColor}-base`, 'mc-transition-all mc-duration-300']"
        :style="handleProgressBarStyle"
      ></div>
    </div>
    <div v-if="props.label || props.supportingLabel" class="mc-flex mc-gap-1.5">
      <span v-if="props.label" class="mc-text-color-strong mc-subheading-sm">{{ percentage }}%</span>
      <span v-if="props.supportingLabel" class="mc-body-md-regular">{{ props.supportingLabel }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { progressBarPropTypes } from './progress-bar';
import { useProgressBar } from './use-progress-bar';

const props = defineProps(progressBarPropTypes);

const { handleProgressBarSize, validColor, percentage, handleProgressBarStyle, containerClasses } =
  useProgressBar(props);
</script>
