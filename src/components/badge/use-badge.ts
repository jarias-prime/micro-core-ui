import { toRefs, computed, ComputedRef } from 'vue';

import classNames from 'classnames';

import type { BadgePropTypes } from './badge';

interface BadgeClasses {
  baseClasses: string;
  variantClasses: string;
  sizeClasses: string;
  positionClasses: string;
}

export const useBadge = (props: BadgePropTypes) => {
  const { variant, size, position } = toRefs(props);

  const badgeClasses: ComputedRef<BadgeClasses> = computed(() => {
    const baseClasses = classNames({
      'mc-flex mc-items-center mc-gap-2': position.value === 'default',
      'mc-relative': position.value === 'top' || position.value === 'bottom',
    });

    const variantClasses = classNames({
      'mc-background-color-surface mc-text-color-base': variant.value === 'neutral',
      'mc-background-color-danger-base mc-text-color-inverted-strong': variant.value === 'danger',
      'mc-background-color-disabled mc-text-color-on-fill-disabled': variant.value === 'disabled',
      'mc-background-color-information-base mc-text-color-inverted-strong': variant.value === 'information',
      'mc-background-color-brand-base mc-text-color-inverted-strong': variant.value === 'brand',
    });

    const sizeClasses = classNames({
      'mc-label-sm-medium !mc-leading-[0] !mc-tracking-normal mc-h-[20px] mc-min-w-[20px] mc-rounded-[32px] mc-py-size-spacing-3xs mc-px-size-spacing-5xs mc-box-border':
        size.value === 'big',
      'mc-label-xs-medium !mc-leading-[0] !mc-tracking-normal mc-h-[16px] mc-min-w-[16px] mc-rounded-[32px] mc-py-size-spacing-6xs mc-px-size-spacing-5xs mc-box-border':
        size.value === 'small',
      'mc-h-[10px] mc-min-w-[10px] mc-rounded-full': size.value === 'tiny',
    });

    const positionClasses = classNames({
      'mc-absolute -mc-top-1 mc-right-1': position.value === 'top' && size.value === 'tiny',
      'mc-absolute -mc-bottom-1 mc-right-1': position.value === 'bottom' && size.value === 'tiny',
      'mc-absolute -mc-top-2 -mc-right-1': position.value === 'top' && size.value === 'small',
      'mc-absolute -mc-bottom-2 -mc-right-1': position.value === 'bottom' && size.value === 'small',
      'mc-absolute -mc-top-3 -mc-right-2': position.value === 'top' && size.value === 'big',
      'mc-absolute -mc-bottom-3 -mc-right-2': position.value === 'bottom' && size.value === 'big',
    });

    return {
      baseClasses,
      variantClasses,
      sizeClasses,
      positionClasses,
    };
  });

  return {
    badgeClasses,
  };
};
