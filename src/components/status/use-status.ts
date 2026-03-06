import { computed, type ComputedRef } from 'vue';

import type { StatusPropTypes } from './status';

export const useStatus = (props: StatusPropTypes) => {
  const statusSize: ComputedRef<string> = computed(() => {
    const stateSizes: Record<string, string> = {
      '2xs': 'mc-w-[14px] mc-h-[14px]',
      xs: 'mc-w-4 mc-h-4',
      sm: 'mc-w-5 mc-h-5',
      base: 'mc-w-6 mc-h-6',
      lg: 'mc-w-8 mc-h-8',
      xl: 'mc-w-10 mc-h-10',
      '2xl': 'mc-w-12 mc-h-12',
    };

    return stateSizes[props.size] || 'mc-w-6 mc-h-6';
  });

  const statusClass: ComputedRef<string> = computed(() => {
    const stateClasses: Record<string, string> = {
      success: 'mc-text-kangkong-600',
      information: 'mc-text-blueberry-700',
      pending: 'mc-text-mango-500',
      caution: 'mc-text-carrot-500',
      danger: 'mc-text-tomato-600',
    };
    return stateClasses[props.state] || 'mc-text-kangkong-600';
  });

  const statusIcon: ComputedRef<string> = computed(() => {
    const stateIcons: Record<string, string> = {
      success: 'ph:check-circle-fill',
      information: 'ph:info-fill',
      pending: 'ph:warning-fill',
      caution: 'ph:warning-fill',
      danger: 'ph:warning-circle-fill',
    };
    return stateIcons[props.state] || 'ph:check-circle-fill';
  });

  const statusDescription: ComputedRef<string> = computed(() => {
    const stateDescriptions: Record<string, string> = {
      success: 'Success',
      information: 'Information',
      pending: 'Pending',
      caution: 'Caution',
      danger: 'Danger',
    };
    return stateDescriptions[props.state] || 'Success';
  });

  return {
    statusIcon,
    statusClass,
    statusDescription,
    statusSize,
  };
};
