import { toRefs, computed } from 'vue';
import classNames from 'classnames';
import type { IconPropTypes } from './icon';

export const useIcon = (props: IconPropTypes) => {
  const { size, tone, variant } = toRefs(props);

  const iconClasses = computed(() => {
    const BASE_CLASSES =
      'mc-rounded-border-radius-md mc-relative mc-inline-block mc-rounded mc-flex mc-items-center mc-justify-center';

    const TONE_MAP = {
      success: {
        primary: 'mc-border-color-brand-base mc-text-color-inverted-strong mc-background-color-success-base',
        secondary: 'mc-border-color-brand-base mc-text-color-success-base mc-bg-kangkong-50',
        tertiary: 'mc-text-color-success-base',
      },
      error: {
        primary: 'mc-border-color-danger-base mc-text-color-inverted-strong mc-background-color-danger-base',
        secondary: 'mc-border-color-danger-base mc-text-color-danger-base mc-bg-tomato-50',
        tertiary: 'mc-text-color-danger-base',
      },
      info: {
        primary: 'mc-border-color-information-base mc-text-color-inverted-strong mc-background-color-information-base',
        secondary: 'mc-border-color-information-base mc-text-color-information-base mc-bg-sky-50',
        tertiary: 'mc-text-color-information-base',
      },
      pending: {
        primary: 'mc-border-color-pending-base mc-text-color-inverted-strong mc-background-color-pending-base',
        secondary: 'mc-border-color-pending-base mc-text-color-pending-base mc-bg-yellow-50',
        tertiary: 'mc-text-color-pending-base',
      },
      caution: {
        primary: 'mc-border-color-caution-base mc-text-color-inverted-strong mc-background-color-caution-base',
        secondary: 'mc-border-color-caution-base mc-text-color-caution-base mc-bg-orange-50',
        tertiary: 'mc-text-color-caution-base',
      },
    };

    const SIZE_MAP = {
      '2xl': variant.value === 'tertiary' ? 'mc-font-size-700' : 'mc-h-20 mc-min-w-20 mc-font-size-700',
      xl: variant.value === 'tertiary' ? 'mc-font-size-600' : 'mc-h-14 mc-min-w-14 mc-font-size-600',
      lg: variant.value === 'tertiary' ? 'mc-font-size-500' : 'mc-h-10 mc-min-w-10 mc-font-size-500',
      md: variant.value === 'tertiary' ? 'mc-font-size-400' : 'mc-h-9 mc-min-w-9 mc-font-size-400',
      sm:
        variant.value === 'tertiary'
          ? 'mc-font-size-300'
          : 'mc-h-6 mc-min-w-6 mc-font-size-300 mc-rounded-border-radius-sm',
      xs:
        variant.value === 'tertiary'
          ? 'mc-font-size-250'
          : 'mc-h-5 mc-min-w-5 mc-font-size-250 mc-rounded-border-radius-xs',
      '2xs':
        variant.value === 'tertiary'
          ? 'mc-font-size-250'
          : 'mc-h-4 mc-min-w-4  mc-font-size-250 mc-rounded-border-radius-xs',
    };

    const toneClasses = classNames('mc-border mc-border-solid', TONE_MAP[tone.value]?.[variant.value] || '');

    const sizeClasses = SIZE_MAP[size.value] || SIZE_MAP.md;

    const variantClasses = classNames({
      'mc-border-0': variant.value === 'primary',
      'mc-border': variant.value === 'secondary',
      'mc-border-0 mc-bg-transparent ': variant.value === 'tertiary' || !variant.value,
    });

    return classNames(variantClasses, BASE_CLASSES, sizeClasses, toneClasses);
  });

  return {
    iconClasses,
  };
};
