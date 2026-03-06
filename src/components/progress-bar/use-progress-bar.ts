import { computed } from 'vue';

import type { ProgressBarPropTypes } from './progress-bar';

export const useProgressBar = (props: ProgressBarPropTypes) => {
  const handleProgressBarSize = computed<string>(() => {
    switch (props.size) {
      case 'xs':
        return 'mc-h-1';
      case 'sm':
        return 'mc-h-2';
      case 'lg':
        return 'mc-h-3';
      default:
        return 'mc-h-3';
    }
  });

  const validColor = computed<string>(() => {
    const validColors = ['success', 'danger', 'warning', 'info', 'neutral'];
    return validColors.includes(props.color) ? props.color : 'success';
  });

  const percentage = computed<number>(() => Math.min((props.value / (props.max || 100)) * 100, 100));

  const handleProgressBarStyle = computed<{ width: string; height: string }>(() => {
    return {
      width: percentage.value + '%',
      height: '100%',
    };
  });

  const containerClasses = computed<string>(() => {
    switch (props.labelPlacement) {
      case 'top':
        return 'mc-flex mc-flex-col-reverse mc-gap-size-spacing-5xs';
      case 'top-start':
        return 'mc-flex mc-flex-col-reverse mc-gap-size-spacing-5xs';
      case 'top-center':
        return 'mc-flex mc-flex-col-reverse mc-gap-size-spacing-5xs mc-items-center';
      case 'top-end':
        return 'mc-flex mc-flex-col-reverse mc-gap-size-spacing-5xs mc-items-end';
      case 'bottom':
        return 'mc-flex mc-flex-col mc-gap-size-spacing-5xs';
      case 'bottom-start':
        return 'mc-flex mc-flex-col mc-gap-size-spacing-5xs';
      case 'bottom-center':
        return 'mc-flex mc-flex-col mc-gap-size-spacing-5xs mc-items-center';
      case 'bottom-end':
        return 'mc-flex mc-flex-col mc-gap-size-spacing-5xs mc-items-end';
      case 'left':
        return 'mc-flex mc-flex-row mc-gap-size-spacing-5xs mc-items-center';
      case 'right':
        return 'mc-flex mc-flex-row-reverse mc-gap-size-spacing-5xs mc-items-center';
      default:
        return 'mc-flex mc-flex-col mc-gap-size-spacing-5xs';
    }
  });

  return {
    handleProgressBarSize,
    validColor,
    percentage,
    handleProgressBarStyle,
    containerClasses,
  };
};
